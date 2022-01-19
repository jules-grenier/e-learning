<template>
  <div class="navbar-wrapper">
    <div class="container">
      <nav class="navbar">
        <div class="brand">
          <router-link to="/">LOGO</router-link>
        </div>
        <div class="nav-links">
          <router-link to="/courses" class="nav-link">Catégories</router-link>
        </div>
        <div class="search">
          <label for="search">
            <ph-magnifying-glass :size="24" fill="regular" class="icon" />
            <input
              type="text"
              placeholder="Rechercher"
              id="search"
              name="search"
              @focus="toggleSearchFocus"
              @blur="toggleSearchFocus"
            />
          </label>
        </div>
        <div class="nav-links">
          <router-link to="/my-courses" class="nav-link">Mes formations</router-link>

          <router-link to="/favorites" class="nav-link">
            <ph-heart :size="24" fill="regular" class="icon" />
          </router-link>
          <router-link to="/cart" class="nav-link">
            <ph-shopping-cart :size="24" fill="regular" class="icon" />
          </router-link>

          <div v-if="!$store.getters['auth/isAuthenticated']" class="nav-links-group">
            <router-link to="/login" class="nav-link btn">Se connecter</router-link>
            <router-link to="/register" class="nav-link btn fill">S'inscrire</router-link>
          </div>

          <UserMenu v-if="$store.getters['auth/isAuthenticated']" />
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhHeart, PhShoppingCart, PhMagnifyingGlass } from "phosphor-vue";

import UserMenu from "@/components/navbar/UserMenu.vue";

export default defineComponent({
  components: {
    PhHeart,
    PhShoppingCart,
    PhMagnifyingGlass,
    UserMenu,
  },
  methods: {
    toggleSearchFocus() {
      const searchNode = document.querySelector(".search");
      const isFocused = searchNode?.classList.contains("focused");

      if (isFocused) searchNode?.classList.remove("focused");
      else searchNode?.classList.add("focused");
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  z-index: 1000;
}

.navbar {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;

  a {
    color: inherit;
    text-decoration: none;
  }

  .brand,
  .nav-link {
    display: inline-flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .nav-links {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .nav-links-group {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  .nav-link {
    font-weight: 600;

    &:not(.btn) {
      &:hover,
      &:hover .icon {
        color: var(--color-blue);
      }
    }

    &.btn {
      border: 1px solid var(--color-black);
      padding-left: 15px;
      padding-right: 15px;
      border-radius: var(--border-radius);

      &:hover {
        border-color: var(--color-blue);
        background-color: var(--color-blue-light);
      }

      &.fill {
        background-color: var(--color-black);
        color: var(--color-grey);

        &:hover {
          border-color: var(--color-blue);
          background-color: var(--color-blue);
          color: var(--color-white);
        }
      }
    }

    &.router-link-exact-active:not(.btn) {
      position: relative;
      color: var(--color-blue);

      &:not(.icon-link):before {
        content: "";
        height: 2px;
        width: 15px;
        border-radius: 50%;
        background-color: currentColor;
        border-radius: var(--border-radius);
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
      }

      &:hover {
        color: var(--color-blue);
      }
    }
  }

  .search {
    display: flex;
    flex-direction: row;
    flex: 1;
    border: 1px solid var(--color-black);
    border-radius: 100px;

    &.focused {
      border-color: var(--color-blue);
      background-color: var(--color-blue-light);

      .icon {
        color: var(--color-blue);
      }
    }

    label {
      display: flex;
      flex-direction: row;
      flex: 1;
      padding: 10px 20px;
      cursor: text;

      .icon {
        margin-right: 10px;
      }
    }

    input {
      flex: 1;
      border: none;
      background-color: inherit;
      color: var(--color-black);
      font-size: 16px;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
