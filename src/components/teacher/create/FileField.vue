<template>
  <span class="file-title">Fichier {{ id + 1 }}</span>

  <div class="file-control">
    <input type="file" id="title-1" name="title-1" />
  </div>
  <div class="form-control">
    <label :for="`description-fichier-${id}`">Description du fichier</label>
    <textarea type="text" :id="`description-fichier-${id}`" :name="`description-fichier-${id}`" />
  </div>

  <button type="button" @click="() => remove(id)" class="remove-btn">
    <ph-trash :size="24" fill="regular" class="trash-icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhTrash } from "phosphor-vue";

export default defineComponent({
  props: {
    id: Number,
    remove: Function,
  },
  components: { PhTrash },
});
</script>

<style lang="scss">
.file-title {
  display: block;
  font-weight: bold;
  margin-bottom: 15px;
}

.file-control {
  margin-bottom: 20px;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--color-red);
  border-radius: var(--border-radius);
  padding: 2px;
  margin-top: 10px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background-color: var(--color-red);
    color: var(--color-grey);
  }
}
</style>
