<template>
  <LayoutTopSpace>
    <h1>Créer une formation</h1>

    <CreateCourseForm />
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { LayoutTopSpace } from "@/layouts";

import CreateCourseForm from "@/components/teacher/create/CreateCourseForm.vue";

export default defineComponent({
  components: { LayoutTopSpace, CreateCourseForm },
});
</script>

<style lang="scss" scoped></style>
