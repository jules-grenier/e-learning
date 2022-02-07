<template>
  <LayoutTopSpace>
    <p>Merci de votre achat.</p>
    <p>Vous pouvez dès à présent commencer votre formation !</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import axios from "axios";

import { LayoutTopSpace } from "@/layouts";
import { CartItem } from "@/types/cart";

export default defineComponent({
  components: { LayoutTopSpace },
  computed: {
    ...mapState("auth", ["token"]),
    ...mapState("cart", ["items"]),
  },
  watch: {
    token: {
      handler: function () {
        this.validatePayment();
      },
      deep: true,
    },
  },
  methods: {
    async validatePayment() {
      const courseIds = this.items.map((course: CartItem) => course.id);
      await axios.post("http://localhost:8090/payments/validation", courseIds, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.$store.dispatch("cart/empty");
    },
  },
});
</script>

<style lang="scss" scoped></style>
