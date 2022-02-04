<template>
  <LayoutTopSpace>
    <h1>Paiement</h1>
    <p>Veuillez renseignez les informations de votre carte afin de procéder au paiement.</p>

    <p>Montant à régler: {{ orderPrice }}€</p>

    <div v-if="!token">Chargement</div>

    <form v-if="token" id="payment-form">
      <div id="payment-element"></div>
      <button id="submit" @click.prevent="submit">Payer</button>
      <div id="error-message"></div>
    </form>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { mapState } from "vuex";
import axios from "axios";

import { LayoutTopSpace } from "@/layouts";
import { CartItem } from "@/types/cart";

const stripePromise = loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);

type DataTypes = {
  stripe: Stripe | null;
  elements: StripeElements | undefined;
  [key: string]: unknown;
};

export default defineComponent({
  components: { LayoutTopSpace },
  data(): DataTypes {
    return {
      stripe: null,
      elements: undefined,
      error: "",
      orderPrice: 0,
    };
  },
  computed: {
    ...mapState("auth", ["token"]),
  },
  watch: {
    token: {
      handler: function () {
        this.loadPaymentElement();
      },
      deep: true,
    },
  },
  methods: {
    async submit() {
      const options = {
        elements: this.elements,
        confirmParams: {
          return_url: "http://localhost:8080/payment/success",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const intentRes = await (this.stripe?.confirmPayment as any)(options);

      if (intentRes?.error) {
        if (intentRes?.error.type === "card_error" || intentRes?.error.type === "validation_error") {
          this.error = intentRes.error.message;
        } else {
          this.error = "An unexpected error occured.";
        }
      }
    },
    async loadPaymentElement() {
      const courses = this.$store.getters["cart/list"];
      const courseIds = courses.map((course: CartItem) => course.id);
      const orderPrice = courses.reduce((total: number, course: CartItem) => total + course.price, 0);
      let clientSecret = "";

      this.orderPrice = orderPrice;

      try {
        const res = await axios.post("http://localhost:8090/payments/intent", courseIds, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        clientSecret = res.data.client_secret;
      } catch (error) {
        console.error(error);
        this.error = "An unexpected error occured.";
      }

      const stripe = await stripePromise;
      const elements = stripe?.elements({ clientSecret });
      const paymentElement = elements?.create("payment");

      paymentElement?.mount("#payment-element");

      if (!this.stripe) this.stripe = stripe;
      if (!this.elements) this.elements = elements;
    },
  },
});
</script>

<style scoped lang="scss">
form {
  width: 400px;
  max-width: 100%;
}
</style>
