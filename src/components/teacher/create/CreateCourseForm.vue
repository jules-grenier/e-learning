<template>
  <form @submit.prevent="onSubmit" autocomplete="off">
    <fieldset>
      <span class="legend">
        <legend>Informations générales</legend>
      </span>

      <div class="fieldset-content">
        <div class="form-group column">
          <div class="form-control">
            <label for="title">Nom de la formation</label>
            <input type="text" id="title" name="title" v-model="courseTitle" />
          </div>
          <div class="form-control">
            <label for="description">Description de la formation</label>
            <textarea id="description" name="description" v-model="courseDescription" />
          </div>
          <div class="form-control">
            <label for="price">Prix de la formation</label>
            <input type="number" id="price" name="price" v-model="coursePrice" />
          </div>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <span class="legend">
        <legend>Contenu</legend>
      </span>

      <div class="fieldset-content">
        <p class="content-note">Votre formation ne peut pas excéder 15 vidéos</p>

        <div class="course-sections">
          <course-create-section
            v-for="(courseSection, index) in courseSections"
            :key="`section-${index}`"
            :id="index"
            :remove="removeSection"
            :ref="`section-${index}`"
            class="course-section"
          >
          </course-create-section>
        </div>

        <button type="button" @click="addSection" class="add-section-btn">
          <ph-plus :size="20" weight="regular" class="btn-icon" />
          <span>Ajouter une section</span>
        </button>
      </div>
    </fieldset>

    <button type="submit" class="submit-btn">Valider et créer la formation</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhPlus } from "phosphor-vue";
import axios from "axios";

import CourseCreateSection from "./CourseCreateSection.vue";
import FileField from "./FileField.vue";

export default defineComponent({
  components: { CourseCreateSection, PhPlus },
  data() {
    return {
      courseSections: [CourseCreateSection],
      courseTitle: "",
      courseDescription: "",
      coursePrice: 0,
    };
  },
  methods: {
    onSubmit(): void {
      type CourseFile = {
        section: string;
        name: string;
        type: string;
      };

      const formData = new FormData();
      const contentDetails: CourseFile[] = [];
      formData.append("course_title", this.courseTitle);
      formData.append("course_description", this.courseDescription);
      formData.append("course_price", String(this.coursePrice));

      this.courseSections.forEach((courseSection, sectionIndex) => {
        const sectionId = `section-${sectionIndex}`;
        const refSection = (this.$refs[sectionId] as typeof CourseCreateSection)[0];
        const { sectionName } = refSection;

        Object.values(refSection.$refs).forEach((refFileField) => {
          const { fileName, file, type } = (refFileField as typeof FileField)[0];

          formData.append("content", file);
          contentDetails.push({ section: sectionName, name: fileName, type });
        });
      });

      formData.append("content_details", JSON.stringify(contentDetails));

      try {
        axios
          .post("http://localhost:8090/courses/create", formData, {
            headers: {
              Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
              "Content-Type": "multipart/form-data; boundary='&--'",
            },
          })
          .then(() => this.$router.push("/"));
      } catch (error) {
        console.error("Failed to upload course.", error);
      }
    },
    addSection(): void {
      this.courseSections.push(CourseCreateSection);
    },
    removeSection(index: number): void {
      this.courseSections.splice(index, 1);
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  margin-top: 60px;
  width: 700px;
  max-width: 100%;

  .form-control {
    input,
    textarea {
      padding: 8px 6px;
    }

    input[id="price"] {
      width: 100px;
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

.fieldset-content {
  padding: 15px;
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--border-radius);

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 6px;
    height: 100%;
    background-color: var(--color-blue);
    border-radius: 5px;
  }
}

.course-sections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.add-section-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--color-black);
  border-radius: var(--border-radius);
  margin-top: 40px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;

  .btn-icon {
    margin-right: 5px;
  }

  &:hover {
    background-color: var(--color-blue);
    color: var(--color-grey);
  }
}
</style>
