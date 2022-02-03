<template>
  <LayoutTopSpace>
    <h1>Paiement</h1>
    <p>Veuillez renseignez les informations de votre carte afin de procéder au paiement.</p>

    <form id="payment-form">
      <div id="payment-element"></div>
      <button id="submit" @click.prevent="submit">Payer</button>
      <div id="error-message"></div>
    </form>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";

import { LayoutTopSpace } from "@/layouts";

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
    };
  },
  methods: {
    async submit() {
      const options = {
        elements: this.elements,
        confirmParams: {
          return_url: "http://localhost:8080",
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
      } else {
        console.log("submit");
      }
    },
  },
  async mounted() {
    const clientSecret = "pi_3KOj0PLTlL7W4GXy0FWKctQM_secret_tHkGdN3qFR8grlrrONBzqwbsz";
    const stripe = await stripePromise;
    const elements = stripe?.elements({ clientSecret });
    const paymentElement = elements?.create("payment");

    paymentElement?.mount("#payment-element");

    if (!this.stripe) this.stripe = stripe;
    if (!this.elements) this.elements = elements;
  },
});
</script>

<style scoped lang="scss">
form {
  width: 400px;
  max-width: 100%;
}
</style>
