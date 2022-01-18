<template>
  <div class="auth-form">
    <header>
      <slot name="header"></slot>
    </header>
    <form @submit.prevent="handleSubmit">
      <slot name="form"></slot>
    </form>
    <slot name="extra"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["handleSubmit"],
});
</script>

<style lang="scss" scoped>
.auth-form {
  width: 400px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  header {
    margin-bottom: 80px;

    h1 {
      margin-bottom: 20px;
    }
  }
}
</style>
