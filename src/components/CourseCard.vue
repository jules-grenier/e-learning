<template>
  <router-link :to="`/courses?c=${course.id}`" class="course-card" :class="type">
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
    };
  },
});
</script>

<style lang="scss">
.course-card {
  display: flex;
  flex-direction: row;
  max-width: 400px;
  text-decoration: none;
  color: var(--color-black);
  background-color: var(--color-grey-2);

  .course-detail {
    flex: 1;
    padding: 15px;

    .course-title {
      margin-bottom: 5px;
    }
  }

  &:hover {
    background-color: var(--color-blue-light);
    box-shadow: var(--shadow-hover);
  }

  &.ongoing {
    .shop-info {
      display: none;
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
  }
}
</style>
