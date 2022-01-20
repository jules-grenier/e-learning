<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <span class="legend">
        <legend>Informations générales</legend>
      </span>
      <div class="form-group column">
        <div class="form-control">
          <label for="title">Nom de la formation</label>
          <input type="text" id="title" name="title" />
        </div>
        <div class="form-control">
          <label for="description">Description de la formation</label>
          <textarea id="description" name="description" />
        </div>
      </div>
    </fieldset>
    <fieldset>
      <span class="legend">
        <legend>Contenu</legend>
      </span>

      <p class="content-note">Votre formation ne doit pas excéder 15 vidéos</p>

      <div class="files-list">
        <div v-for="(fileField, index) in fileFields" :key="index" class="file-field">
          <FileField :id="index" :remove="removeFileField" />
        </div>
      </div>

      <button type="button" @click="addFileField" class="add-btn">
        <ph-plus :size="20" fill="regular" class="add-icon" />
        <span>Ajouter un nouveau fichier</span>
      </button>
    </fieldset>

    <button type="submit" class="submit-btn">Valider et créer la formation</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhPlus } from "phosphor-vue";

import FileField from "./FileField.vue";

export default defineComponent({
  components: { FileField, PhPlus },
  data() {
    return {
      fileFields: [FileField],
    };
  },
  methods: {
    onSubmit(): void {
      console.log("form submitted");
    },
    addFileField(): void {
      this.fileFields.push(FileField);
    },
    removeFileField(index: number): void {
      this.fileFields.splice(index, 1);
    },
  },
});
</script>

<style lang="scss">
form {
  margin-top: 60px;
  width: 700px;
  max-width: 100%;

  .form-control {
    input,
    textarea {
      padding: 8px 6px;
    }
  }

  .submit-btn {
    width: 300px;
    max-width: 100%;
  }
}

.content-note {
  color: var(--color-red);
  font-size: 14px;
  margin-bottom: 30px;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: -5px;

  .file-field {
    border-radius: var(--border-radius);
    padding: 5px;

    &:hover {
      background-color: var(--color-blue-light);
    }
  }
}

.add-btn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--color-black);
  padding: 8px 16px;
  margin-top: 30px;
  border-radius: var(--border-radius);
  cursor: pointer;

  .add-icon {
    margin-right: 5px;
  }

  &:hover {
    border-color: var(--color-blue);
    background-color: var(--color-blue-light);
  }
}
</style>
