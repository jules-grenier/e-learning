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
          <div v-if="course.content" class="content-length">{{ sessionsCount }} sessions</div>

          <div class="course-sections">
            <div
              v-for="(sessions, section, sectionIndex) in course.content"
              :key="`section-${sectionIndex}`"
              class="section"
            >
              <div class="section-name">{{ sectionIndex + 1 }}. {{ section }}</div>

              <div class="section-items">
                <div
                  v-for="(session, sessionIndex) in sessions"
                  :key="`session-${sectionIndex}-${sessionIndex}`"
                  class="session"
                >
                  {{ sessionIndex + 1 }}. {{ session.name }}
                </div>
              </div>
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
import { Course } from "@/types/courses";

export default defineComponent({
  components: { LayoutTopSpace },
  data() {
    return {
      course: {},
      sessionsCount: 0,
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
        let sessionsCount = 0;

        Object.values(res.data.content as Course).forEach((sessions) => {
          sessions.forEach(() => (sessionsCount += 1));
        });

        this.sessionsCount = sessionsCount;
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
  height: max-content;
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
    width: 600px;

    .content-length {
      margin-top: 20px;
      margin-bottom: 15px;
    }

    .course-sections {
      background-color: var(--color-white);
      border: 1px solid var(--color-grey-2);
      border-radius: var(--border-radius);

      .section {
        padding-top: -1px;

        &:first-child {
          .section-name {
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
          }
        }

        .section-name {
          padding: 10px;
          background-color: var(--color-blue-light);
          font-weight: bold;
        }

        .section-items {
          padding: 30px 25px;

          .session {
            & + .session {
              margin-top: 10px;
            }
          }
        }
      }
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
