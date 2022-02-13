<template>
  <div class="course-section">
    <span class="section-name">{{ id + 1 }}. {{ sectionName || "Section sans nom" }}</span>

    <div class="section-content">
      <div class="form-control">
        <label :for="`section-name-${id}`">Nom de la section</label>
        <input
          type="text"
          :id="`section-name-${id}`"
          :name="`section-name-${id}`"
          v-model="sectionName"
          @change="onNameChange"
        />
      </div>

      <div class="files-list">
        <div v-for="(fileField, index) in fileFields" :key="`file-${id}${index}`" class="file-field">
          <FileField :ref="`file-${id}-${index}`" :id="index" :remove="removeFileField" />
        </div>
      </div>

      <div class="section-cta">
        <button type="button" @click="addFileField" class="action-btn add-file-btn">
          <ph-plus :size="20" weight="light" class="btn-icon" />
          <span class="btn-text">Ajouter un fichier</span>
        </button>

        <button type="button" @click="() => remove(id)" class="action-btn remove-section-btn">
          <ph-trash :size="20" weight="light" class="btn-icon" />
          <span class="btn-text">Supprimer la section</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhPlus, PhTrash } from "phosphor-vue";

import FileField from "./FileField.vue";

export default defineComponent({
  name: "course-section",
  props: {
    id: Number,
    remove: Function,
  },
  components: { PhTrash, PhPlus, FileField },
  data() {
    return {
      fileFields: [FileField],
      sectionName: "",
    };
  },
  methods: {
    onNameChange(e: Event) {
      this.sectionName = (e.target as HTMLInputElement).value;
    },
    addFileField(): void {
      this.fileFields.push(FileField);
    },
    removeFileField(index: number) {
      this.fileFields.splice(index, 1);
    },
  },
});
</script>

<style lang="scss" scoped>
.section-name {
  display: block;
  font-weight: bold;
  margin-bottom: 15px;
}

.section-content {
  padding: 15px;
  margin-top: 20px;
  position: relative;
  background-color: var(--color-yellow-light);

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 6px;
    height: 100%;
    background-color: var(--color-yellow);
    border-radius: 5px;
  }

  .files-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
  }

  .file-field {
    border-radius: var(--border-radius);
    padding: 5px;

    &:hover {
      background-color: var(--color-blue-light);
    }
  }
}

.section-cta {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 30px;

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: var(--color-black);
    border-radius: var(--border-radius);
    padding: 3px 6px;
    cursor: pointer;

    &.add-file-btn {
      .btn-icon {
        margin-right: 5px;
      }

      &:hover {
        background-color: var(--color-blue);
        color: var(--color-grey);
      }
    }

    &.remove-section-btn {
      .btn-icon {
        margin-right: 5px;
      }

      &:hover {
        background-color: var(--color-red);
        color: var(--color-grey);
      }
    }
  }
}
</style>
