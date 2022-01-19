<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="title">Nom de la formation</label>
      <input type="text" id="title" name="title" />
    </div>
    <div class="form-control">
      <label for="description">Description de la formation</label>
      <textarea id="description" name="description" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    onSubmit() {
      console.log("form submitted");
    },
  },
});
</script>

<style lang="scss">
form {
  margin-top: 60px;
  width: 700px;
  max-width: 100%;
}
</style>
