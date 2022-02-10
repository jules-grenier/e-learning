<template>
  <LayoutTopSpace>
    <div class="grid">
      <div class="shop-details">
        <img :src="image" alt="course image" class="course-image" />
        <span class="course-price">{{ course.price }}€</span>

        <div class="cart-actions">
          <button v-if="!courseIsInCart" @click="addToCart" class="cart-btn btn-add">Ajouter au panier</button>
          <button v-if="courseIsInCart" @click="removeFromCart" class="cart-btn btn-remove">Enlever du panier</button>
        </div>
      </div>
      <div class="course-details">
        <div class="course-general-info">
          <h1 class="course-title">{{ course.title }}</h1>
          <span class="course-author">par {{ course.author_name }}</span>
          <p class="course-description">{{ course.description }}</p>
        </div>

        <div class="course-content">
          <h2>Contenu de la formation</h2>
          <div v-if="course.content" class="content-length">{{ course.content.length }} sessions</div>
          <div class="content-items">
            <div class="content-item" v-for="(file, index) in course.content" :key="file.id">
              <p>{{ index + 1 }}. {{ file.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import { LayoutTopSpace } from "@/layouts";

export default defineComponent({
  components: { LayoutTopSpace },
  data() {
    return {
      course: {},
      courseIsInCart: false,
      image: "https://via.placeholder.com/350x200",
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
      axios.get(`http://localhost:8090/courses/${this.$route.params.id}`).then((res) => {
        this.course = res.data;
      });
      this.courseIsInCart = await this.$store.dispatch("cart/isInCart", this.course);
    });
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.shop-details {
  border: 1px solid var(--color-grey-2);
  border-radius: var(--border-radius);
  background-color: var(--color-white);

  .course-image {
    max-width: 350px;
    border-radius: var(--border-radius);
  }

  .course-price {
    font-weight: bold;
    font-size: 24px;
    display: block;
    margin-top: 20px;
    padding: 0px 40px;
  }

  .cart-actions {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0px 40px;

    .cart-btn {
      padding: 15px 30px;
      border: 1px solid transparent;
      font-size: 16px;
      border-radius: var(--border-radius);
      width: 100%;
      cursor: pointer;

      &.btn-add {
        background-color: var(--color-blue);
        border-color: var(--color-blue);
        color: var(--color-white);

        &:hover {
          background-color: var(--color-black);
          border-color: var(--color-black);
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

.course-details {
  flex: 1;

  .course-general-info {
    .course-author {
      margin-top: 10px;
    }

    .course-description {
      margin-top: 20px;
    }
  }

  .course-content {
    margin-top: 40px;

    .content-length {
      margin-top: 20px;
    }

    .content-items {
      margin-top: 10px;
      padding: 20px;
      border: 1px solid var(--color-grey-2);
      border-radius: var(--border-radius);
      background-color: var(--color-white);

      .content-item {
        & + .content-item {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
