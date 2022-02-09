<template>
  <LayoutTopSpace>
    <h1>Mon panier</h1>

    <div class="cart-content">
      <div v-if="!cartLength" class="message-empty">Aucun article dans le panier</div>

      <div v-if="cartLength" class="cart-length">
        {{ `${cartLength} ${cartLength === 1 ? "article" : "articles"}` }}
      </div>

      <div v-if="cartLength" class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="image" alt="item image" class="item-image" />

          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="course-description">{{ item.description }}</p>
            <span class="author-name">{{ item.author_name }}</span>

            <div class="remove-from-cart">
              <button @click="removeFromCart(item)" class="remove-from-cart-btn">Retirer du panier</button>
            </div>
          </div>
        </div>
      </div>

      <router-link to="/cart/checkout" class="validate-cart-btn">Valider et payer</router-link>
    </div>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { LayoutTopSpace } from "@/layouts";
import { CartItem } from "@/types/cart";

export default defineComponent({
  components: { LayoutTopSpace },
  data() {
    return {
      image: "https://via.placeholder.com/150x150",
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
  methods: {
    removeFromCart(item: CartItem) {
      this.$store.dispatch("cart/remove", item);
    },
  },
});
</script>

<style lang="scss" scoped>
.cart-content {
  margin-top: 40px;

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0px;
    max-width: max-content;
  }

  .cart-item {
    display: flex;
    flex-direction: row;
    min-width: 400px;
    border-radius: var(--border-radius);

    .item-details {
      display: flex;
      flex-direction: column;
      padding: 10px;

      .course-description {
        margin-top: 3px;
      }

      .author-name {
        margin-top: 10px;
      }

      .remove-from-cart {
        margin-top: auto;

        .remove-from-cart-btn {
          margin-top: auto;
          padding: 5px 10px;
          background-color: transparent;
          border: 1px solid var(--color-black);
          color: var(--color-black);
          border-radius: var(--border-radius);
          cursor: pointer;

          &:hover {
            background-color: var(--color-black);
            color: var(--color-white);
          }
        }
      }
    }
  }

  .item-image {
    max-width: 150px;
    border-radius: var(--border-radius);
  }

  .validate-cart-btn {
    display: inline-block;
    margin-top: auto;
    padding: 8px 16px;
    background-color: var(--color-blue);
    border: 1px solid var(--color-blue);
    color: var(--color-white);
    border-radius: var(--border-radius);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: var(--color-black);
      border-color: var(--color-black);
      color: var(--color-white);
    }
  }
}
</style>
