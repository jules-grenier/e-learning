<template>
  <div class="user-menu">
    <img
      src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/1014850602,width=178,height=178,version=1550066898/giraffe-animal-wildlife-vector-cool-image-cartoon.png"
      width="32"
      height="32"
      alt="profile picture"
      class="profile-picture"
    />
    <div class="dropdown-menu-wrapper">
      <div class="dropdown-menu">
        <div class="user-identity">
          <div class="user-profile-picture">
            <img
              src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/1014850602,width=178,height=178,version=1550066898/giraffe-animal-wildlife-vector-cool-image-cartoon.png"
              width="60"
              height="60"
              alt="profile picture"
            />
          </div>
          <div class="user-info">
            <span class="user-name">{{ user.firstname }} {{ user.lastname }}</span>
            <span class="user-email">{{ user.email }}</span>
          </div>
        </div>

        <div class="links-group">
          <div class="dropdown-link">
            <router-link to="/my-courses" class="link">Mon apprentissage</router-link>
          </div>
          <div class="dropdown-link">
            <router-link to="/cart" class="link">Mon panier</router-link>
          </div>
          <div class="dropdown-link">
            <router-link to="/wishlist" class="link">Liste de souhaits</router-link>
          </div>
        </div>

        <div class="links-group">
          <div v-if="$store.getters['auth/user'].role === 'teacher'" class="dropdown-link">
            <router-link :to="{ name: 'CreateCourse' }" class="link">Créer une formation</router-link>
          </div>
        </div>

        <div class="links-group">
          <div class="dropdown-link">
            <router-link :to="`/user/${user.id}`" class="link">Mon profile</router-link>
          </div>
          <div class="dropdown-link">
            <router-link to="/account" class="link">Mon compte</router-link>
          </div>
        </div>

        <div class="links-group">
          <div class="dropdown-link">
            <span class="link" @click="logout">Se déconnecter</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      user: this.$store.getters["auth/user"],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.user-menu {
  position: relative;
  display: flex;
  align-items: center;

  .profile-picture {
    border: 1px solid var(--color-black);
    border-radius: 50%;
  }

  .dropdown-menu-wrapper {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 100;
    display: none;
    padding-top: 10px;
  }

  .dropdown-menu {
    min-width: 200px;
    width: max-content;
    background-color: var(--color-grey);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-hover);

    .links-group {
      border-top: 1px solid var(--color-grey-2);
      padding: 5px;
    }

    .user-identity {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;
      padding: 10px 20px;

      .user-profile-picture {
        img {
          border: 1px solid var(--color-black);
          border-radius: 50%;
        }
      }

      .user-info {
        display: flex;
        flex-direction: column;
        flex: 1;

        .user-name {
          font-weight: bold;
        }

        .user-email {
          margin-top: 5px;
          font-size: 13px;
        }
      }
    }

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

    .dropdown-menu-wrapper {
      display: block;
    }
  }
}
</style>
