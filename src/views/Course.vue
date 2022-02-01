<template>
  <LayoutTopSpace>
    <h1>{{ course.title }}</h1>
    <span>{{ course.author_name }}</span>
    <p>{{ course.description }}</p>

    <div class="actions">
      <button v-if="!courseIsInCart" @click="addToCart">Ajouter au panier</button>
      <button v-if="courseIsInCart" @click="removeFromCart">Enlever du panier</button>
    </div>

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
      this.course = await this.$store.dispatch("courses/getCourse", this.$route.params.id);
      this.courseIsInCart = await this.$store.dispatch("cart/isInCart", this.course);
    });
  },
});
</script>

<style lang="scss"></style>
