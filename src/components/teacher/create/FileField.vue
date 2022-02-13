<template>
  <span class="file-title">{{ id + 1 }}. {{ fileName || "Fichier sans nom" }}</span>

  <div class="form-control">
    <label :for="`file-name-${id}`">Nom du fichier</label>
    <input type="text" :id="`file-name-${id}`" :name="`file-name-${id}`" v-model="fileName" @change="onNameChange" />
  </div>
  <div class="file-control">
    <input type="file" :id="`title-${id}`" :name="`title-${id}`" :ref="file" @change="onFileChange" />
  </div>

  <button type="button" @click="() => remove(id)" class="remove-file-btn">
    <ph-trash :size="20" weight="light" class="btn-icon" />
    <span>Supprimer le fichier</span>
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
  data() {
    return {
      file: undefined as File | undefined,
      fileName: "",
      type: "video",
    };
  },
  methods: {
    onNameChange(e: Event) {
      this.fileName = (e.target as HTMLInputElement).value;
    },
    onFileChange(e: Event) {
      this.file = (e.target as HTMLInputElement).files?.[0];
    },
  },
});
</script>

<style lang="scss" scoped>
.file-title {
  display: block;
  font-weight: bold;
  margin-bottom: 15px;
}

.file-control {
  margin-top: 20px;
}

.remove-file-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--color-black);
  border-radius: var(--border-radius);
  margin-left: auto;
  padding: 3px 6px;
  cursor: pointer;

  .btn-icon {
    margin-right: 5px;
  }

  &:hover {
    background-color: var(--color-red);
    color: var(--color-grey);
  }
}
</style>
