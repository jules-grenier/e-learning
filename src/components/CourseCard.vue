<template>
  <div class="course-card" :class="type">
    <router-link :to="courseLink">
      <div class="course-image">
        <img :src="image" :alt="course.title" />
        <div v-if="type === 'ongoing'" class="overlay">
          <ph-play-circle :size="50" fill="regular" class="play-icon" />
        </div>
      </div>
      <div class="course-detail">
        <h4 class="course-title">{{ course.title }}</h4>
        <p class="course-description">{{ course.description }}</p>
      </div>
    </router-link>

    <div v-if="type === 'showcase'" class="shop-info">
      <div class="price">{{ course.price }}€</div>
      <div v-if="type === 'showcase'" class="cart-actions">
        <button v-if="!courseIsInCart" @click="addToCart" class="cart-btn btn-add">Ajouter au panier</button>
        <button v-if="courseIsInCart" @click="removeFromCart" class="cart-btn btn-remove">Enlever du panier</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { PhPlayCircle } from "phosphor-vue";

export default defineComponent({
  components: { PhPlayCircle },
  props: ["type", "course"],
  data() {
    const images = {
      thumbnail: "https://via.placeholder.com/130x130",
      medium: "https://via.placeholder.com/400x200",
    };

    return {
      detailed: this.type === "ongoing" ? "ongoing" : "showcase",
      image: this.type === "ongoing" ? images.thumbnail : images.medium,
      courseLink: this.type === "ongoing" ? `/course/learn/${this.course.id}` : `/course/overview/${this.course.id}`,
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

<style lang="scss" scoped>
.course-card {
  display: flex;
  flex-direction: row;
  max-width: 400px;
  color: var(--color-black);
  background-color: var(--color-grey-2);

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--color-black);
  }

  .course-detail {
    flex: 1;
    padding: 15px;

    .course-title {
      margin-bottom: 5px;
    }
  }

  &:hover {
    box-shadow: var(--shadow-hover);
  }

  &.ongoing {
    a {
      flex-direction: row;
    }

    .course-image {
      position: relative;

      .overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#000000, 0.5);

        .play-icon {
          color: var(--black);
        }
      }
    }
  }

  &.showcase {
    flex-direction: column;

    .shop-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0px 15px 15px 15px;
    }

    .price {
      font-size: 20px;
    }

    .cart-btn {
      padding: 8px 16px;
      border: 1px solid transparent;
      border-radius: var(--border-radius);
      cursor: pointer;

      &.btn-add {
        background-color: var(--color-blue-light);
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
  }
}
</style>
