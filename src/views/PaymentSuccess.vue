<template>
  <LayoutTopSpace>
    <p>Merci de votre achat.</p>
    <p>Vous pouvez dès à présent commencer votre formation !</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { LayoutTopSpace } from "@/layouts";

export default defineComponent({
  components: { LayoutTopSpace },
});
</script>

<style lang="scss" scoped></style>
