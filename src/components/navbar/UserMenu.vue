<template>
  <div class="user-menu">
    <ph-user :size="24" fill="regular" class="user-menu-icon" />
    <div class="dropdown-menu">
      <div v-if="$store.getters['auth/user'].role === 'teacher'" class="dropdown-link">
        <router-link :to="{ name: 'CreateCourse' }" class="link">Créer une formation</router-link>
      </div>
      <div class="dropdown-link">
        <router-link to="/my-account" class="link">Mon compte</router-link>
      </div>
      <div class="dropdown-link">
        <span class="link" @click="logout">Se déconnecter</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhUser } from "phosphor-vue";

export default defineComponent({
  components: { PhUser },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss">
.user-menu {
  position: relative;
  display: flex;
  align-items: center;

  .dropdown-menu {
    position: absolute;
    right: 0;
    top: 100%;
    min-width: max-content;
    width: max-content;
    background-color: var(--color-grey);
    border-radius: var(--border-radius);
    display: none;
    box-shadow: var(--shadow-hover);

    .dropdown-link {
      cursor: pointer;
      border-radius: var(--border-radius);
      font-size: 15px;

      .link {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 8px 10px;
      }

      &:hover {
        background-color: var(--color-blue-light);
      }
    }
  }

  &:hover {
    .user-menu-icon {
      color: var(--color-blue);
    }

    .dropdown-menu {
      display: block;
    }
  }
}
</style>
