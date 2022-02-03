<template>
  <div class="cart-menu">
    <router-link to="/cart" class="nav-link cart-icon">
      <ph-shopping-cart :size="24" fill="regular" class="icon" />
      <div v-if="cartLength" class="items-indicator"></div>
    </router-link>
    <div class="dropdown-menu">
      <div v-if="!cartLength" class="message-empty">Votre panier est vide</div>
      <div v-if="cartLength" class="dropdown-links">
        <div v-for="item in cartItems" :key="item.id" class="dropdown-link">
          <router-link :to="`/courses/${item.id}`" class="link">
            <img :src="image" alt="item image" class="item-image" />
            <div class="item-details">
              <span class="item-name">{{ item.title }}</span>
              <span class="item-author">{{ item.author_name }}</span>
            </div>
          </router-link>
        </div>
        <div class="open-cart-link">
          <router-link to="/cart"> Ouvrir le panier </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhShoppingCart } from "phosphor-vue";

export default defineComponent({
  components: { PhShoppingCart },
  data() {
    return {
      image: "https://via.placeholder.com/50x50",
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters["cart/list"];
    },
    cartLength() {
      return this.$store.getters["cart/length"];
    },
  },
});
</script>

<style lang="scss" scoped>
.cart-menu {
  position: relative;
  display: flex;
  align-items: center;

  .cart-icon {
    position: relative;

    .items-indicator {
      position: absolute;
      top: 6px;
      right: -2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--color-black);
      border: 2px solid var(--color-white);
    }

    &:hover {
      .items-indicator {
        background-color: currentColor;
      }
    }
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 100;
    min-width: max-content;
    width: max-content;
    min-height: 100px;
    background-color: var(--color-grey);
    border-radius: var(--border-radius);
    display: none;
    box-shadow: var(--shadow-hover);

    .message-empty {
      align-self: center;
      padding: 8px 10px;
    }

    .dropdown-link {
      cursor: pointer;
      border-radius: var(--border-radius);
      font-size: 15px;

      .link {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        color: inherit;
        padding: 8px 10px;

        .item-image {
          margin-right: 5px;
          max-width: 50px;
        }

        .item-details {
          display: flex;
          flex-direction: column;

          .item-name {
            font-weight: bold;
          }
        }
      }

      &:hover {
        background-color: var(--color-blue-light);
      }
    }

    .open-cart-link {
      padding: 8px 10px;

      a {
        cursor: pointer;
        display: block;
        width: 100%;
        border: 1px solid var(--color-black);
        padding: 7px 15px;
        border-radius: var(--border-radius);
        color: var(--color-black);
        text-decoration: none;
        text-align: center;

        &:hover {
          border-color: var(--color-blue);
          background-color: var(--color-blue-light);
        }
      }
    }
  }

  &:hover {
    .cart-menu-icon {
      color: var(--color-blue);
    }

    .dropdown-menu {
      display: flex;
    }
  }
}
</style>
