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
            <p>{{ item.description }}</p>
            <span>{{ item.author_name }}</span>

            <div class="remove-from-cart">
              <button @click="removeFromCart(item)">Retirer du panier</button>
            </div>
          </div>
        </div>
      </div>
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
      image: "https://via.placeholder.com/200x200",
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
    margin-top: 20px;
    max-width: max-content;
  }

  .cart-item {
    display: flex;
    flex-direction: row;

    &:hover {
      background-color: var(--color-blue-light);
      // box-shadow: var(--shadow-hover);
    }

    .item-details {
      padding: 10px;
    }
  }

  .item-image {
    max-width: 200px;
  }
}
</style>
