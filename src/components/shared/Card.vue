<template>
  <div class="card" :class="size">
    <div class="card-header">
      <img :src="image" :alt="title" class="header-image" />
    </div>

    <div class="card-body">
      <slot name="body"></slot>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "card",
  props: {
    size: {
      type: String,
      default: "medium",
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
  },
});
</script>

<style scoped lang="scss">
.card {
  max-width: 400px;
  color: var(--color-black);
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  .card-header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);

    .card-header-image {
      border-radius: var(--border-radius);
    }
  }

  .card-body {
    padding: 15px;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);

    .card-title {
      margin-bottom: 5px;
    }
  }

  .card-footer {
    padding: 15px;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  &:deep(a) {
    text-decoration: none;
    color: var(--color-black);
  }

  &.small {
    grid-template-columns: 142px 1fr;
    align-items: center;

    .card-header {
      grid-row: 1 / 3;
    }

    .card-body {
      grid-row: 1 / span auto;
    }

    .card-footer {
      grid-row: 2 / 3;
    }
  }
}
</style>
