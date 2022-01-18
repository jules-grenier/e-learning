<template>
  <LayoutTopSpace>
    <AuthForm :onSubmit="onSubmit">
      <template v-slot:header>
        <h1>Connexion</h1>
        <p>Connectes-toi à ton compte !</p>
      </template>

      <template v-slot:form>
        <div class="form-control">
          <label for="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" v-model="credentials.email" />
        </div>
        <div class="form-control">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" name="password" v-model="credentials.password" />
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button type="submit" class="submit-btn">Se connecter</button>
      </template>

      <template v-slot:extra>
        <div class="action-links">
          <router-link to="/forgot-password">J'ai oublié mon mot de passe</router-link>
          <router-link to="/register">Je veux créer un compte</router-link>
        </div>
      </template>
    </AuthForm>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { LayoutTopSpace } from "@/layouts";
import AuthForm from "@/components/AuthForm.vue";

export default defineComponent({
  components: { LayoutTopSpace, AuthForm },
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  watch: {
    "credentials.email": function () {
      this.hideError("email");
    },
    "credentials.password": function () {
      this.hideError("password");
    },
  },
  methods: {
    showError(fieldId: string, message: string): void {
      this.errorMessage = message;
      if (fieldId) document.getElementById(fieldId)?.closest(".form-control")?.classList.add("error");
    },
    hideError(fieldId: string): void {
      this.errorMessage = "";
      if (fieldId) document.getElementById(fieldId)?.closest(".form-control")?.classList.remove("error");
    },
    async onSubmit() {
      if (!this.credentials.email) {
        this.showError("email", "Votre e-mail est requises");
        return false;
      }
      if (!this.credentials.password) {
        this.showError("password", "Votre mot de passe est requis");
        return false;
      }

      try {
        await this.$store.dispatch("auth/login", this.credentials);
      } catch (error) {
        this.showError("", this.$store.getters["auth/error"]);
        return false;
      }

      // TODO :  redirect to source stored in localstorage if there is one or redirect to home page
      if (this.$store.getters["auth/isAuthenticated"]) this.$router.push("/");
    },
  },
  mounted() {
    const router = this.$router;
    const store = this.$store;

    (async function refreshUser() {
      const rawUser = localStorage.getItem("user");
      let token;

      if (rawUser) token = JSON.parse(rawUser).token;

      if (token) {
        const user = await store.dispatch("auth/retrieveProfile", token);
        if (user) router.push("/");
      }
    })();
  },
});
</script>

<style lang="scss" scoped>
.action-links {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 35px;

  a {
    color: inherit;

    &:hover {
      color: var(--color-blue);
      text-decoration: none;
    }
  }
}
</style>
