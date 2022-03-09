<template>
  <card :size="size" :image="image" :title="course.title">
    <template v-slot:header>
      <router-link :to="courseLink">
        <img :src="image" :alt="course.title" class="course-image" />
      </router-link>
    </template>

    <template v-slot:body>
      <router-link :to="courseLink">
        <h4 class="course-title">{{ course.title }}</h4>
        <p class="course-description">{{ course.description }}</p>
      </router-link>
    </template>

    <template v-slot:footer>
      <div class="shop-info">
        <div class="price">{{ course.price }}€</div>
        <div class="cart-actions">
          <button v-if="!courseIsInCart" @click="addToCart" class="cart-btn btn-add">Ajouter au panier</button>
          <button v-if="courseIsInCart" @click="removeFromCart" class="cart-btn btn-remove">Enlever du panier</button>
        </div>
      </div>
    </template>
  </card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import Card from "@/components/shared/Card.vue";

export default defineComponent({
  name: "course-showcase",
  props: {
    course: {
      type: Object,
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  components: { Card },
  data() {
    const images = {
      small: "https://via.placeholder.com/142x142",
      medium: "https://via.placeholder.com/400x200",
    };

    return {
      image: this.size === "medium" ? images.medium : images.small,
      courseLink: `/course/overview/${this.course?.id}`,
      courseIsInCart: false,
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch("cart/add", this.course);
      this.courseIsInCart = true;
    },
    removeFromCart() {
      this.$store.dispatch("cart/remove", this.course);
      this.courseIsInCart = false;
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.courseIsInCart = await this.$store.dispatch("cart/isInCart", this.course);
    });
  },
});
</script>

<style scoped lang="scss">
.shop-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.price {
  font-size: 20px;
  font-weight: bold;
}

.cart-btn {
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  cursor: pointer;

  &.btn-add {
    background-color: var(--color-white);
    border-color: var(--color-blue);
    color: var(--color-blue);

    &:hover {
      background-color: var(--color-blue);
      border-color: var(--color-blue);
      color: var(--color-white);
    }
  }

  &.btn-remove {
    background-color: transparent;
    border-color: var(--color-black);
    color: var(--color-black);

    &:hover {
      background-color: var(--color-black);
      color: var(--color-white);
    }
  }
}
</style>
