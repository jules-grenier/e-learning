<template>
  <LayoutTopSpace>
    <h1>{{ course.title }}</h1>
    <span>{{ course.author_name }}</span>
    <p>{{ course.description }}</p>

    <div class="content">
      <h2>Contenu de la formation</h2>
      <div class="file" v-for="file in course.content" :key="file.id">
        <p>{{ file.description }}</p>
      </div>
    </div>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { LayoutTopSpace } from "@/layouts";

export default defineComponent({
  components: { LayoutTopSpace },
  data() {
    return {
      course: {},
    };
  },
  mounted() {
    console.log("id", this.$route.params.id);
    this.$nextTick(async () => {
      this.course = await this.$store.dispatch("courses/getCourse", this.$route.params.id);
      console.log("this course", this.course);
    });
  },
});
</script>

<style lang="scss"></style>
