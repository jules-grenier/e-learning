<template>
  <LayoutTopSpace>
    <AuthForm :onSubmit="onSubmit">
      <template v-slot:header>
        <h1>Créer un compte</h1>
        <p>Crées ton compte et accèdes à des formations de qualité !</p>
      </template>

      <template v-slot:form>
        <div class="form-group">
          <div class="form-control">
            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" name="firstname" v-model="credentials.firstname" />
          </div>
          <div class="form-control">
            <label for="lastname">Nom</label>
            <input type="text" id="lastname" name="lastname" v-model="credentials.lastname" />
          </div>
        </div>
        <div class="form-control">
          <label for="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" v-model="credentials.email" />
        </div>
        <div class="form-control">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" name="password" v-model="credentials.password" />
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button type="submit" class="submit-btn">S'inscrire</button>
      </template>

      <template v-slot:extra>
        <div class="action-links">
          <router-link to="/login">J'ai déjà un compte</router-link>
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  watch: {
    "credentials.firstname": function () {
      this.hideError("firstname");
    },
    "credentials.lastname": function () {
      this.hideError("lastname");
    },
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
      if (!this.credentials.firstname) {
        this.showError("firstname", "Quel est votre prénom ?");
        return false;
      }
      if (!this.credentials.lastname) {
        this.showError("lastname", "Quel est votre nom ?");
        return false;
      }
      if (!this.credentials.email) {
        this.showError("email", "Quel est votre e-mail ?");
        return false;
      }
      if (!this.credentials.password) {
        this.showError("password", "Un mot de passe est requis");
        return false;
      }

      try {
        await this.$store.dispatch("auth/register", this.credentials);
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
