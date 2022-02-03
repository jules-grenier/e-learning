<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Navbar from "@/components/Navbar.vue";

import "@/styles/global.scss";

export default defineComponent({
  components: { Navbar },
  mounted() {
    const store = this.$store;

    (async function refreshUser() {
      const rawUser = localStorage.getItem("user");
      let token;

      if (rawUser) token = JSON.parse(rawUser).token;

      await store.dispatch("auth/retrieveProfile", token);
    })();
  },
  watch: {
    $route() {
      this.$store.dispatch("cart/set");
    },
  },
});
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
