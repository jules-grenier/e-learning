<template>
  <card :size="size" :image="image" :title="course.title">
    <template v-slot:body>
      <router-link :to="courseLink">
        <h4 class="course-title">{{ course.title }}</h4>
        <p class="course-description">{{ course.description }}</p>
      </router-link>
    </template>

    <template v-if="showProgress" v-slot:footer>
      <div class="course-progress">
        <span class="label">Completion</span>
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
      </div>
    </template>
  </card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import Card from "@/components/shared/Card.vue";

export default defineComponent({
  name: "course-owned",
  props: {
    course: {
      type: Object,
    },
    size: {
      type: String,
      default: "medium",
    },
    showProgress: {
      type: Boolean,
      default: true,
    },
  },
  components: { Card },
  data() {
    const images = {
      small: "https://placekitten.com/142/142",
      medium: "https://placekitten.com/400/200",
    };

    return {
      image: this.size === "medium" ? images.medium : images.small,
      courseLink: `/course/learn/${this.course?.id}`,
    };
  },
});
</script>

<style scoped lang="scss">
.course-progress {
  display: flex;
  flex-direction: column;

  .label {
    font-size: 14px;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 7px;
    margin-top: 5px;
    border-radius: var(--border-radius);
    background-color: var(--color-grey-2);

    .progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 56%;
      height: 100%;
      background-color: var(--color-blue);
      border-radius: var(--border-radius);
    }
  }
}
</style>
