<template>
  <LayoutDefault>
    <div id="course">
      <h1>{{ course.title }}</h1>

      <div class="grid">
        <div class="col-left course-content">
          <div class="course-display"></div>

          <div class="about-course">
            <h2>A propos</h2>
            <p>{{ course.description }}</p>
            <span>{{ course.author_name }}</span>
          </div>
        </div>

        <div class="col-right course-content-overview">
          <h3>Contenu de la formation</h3>

          <ul class="content-list">
            <li v-for="(file, index) in course.content" :key="`content-${file.id}`" class="list-item">
              {{ index + 1 }}. {{ file.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import { LayoutDefault } from "@/layouts";

export default defineComponent({
  components: { LayoutDefault },
  data() {
    return {
      course: {},
    };
  },
  mounted() {
    console.log("mounted");
    this.course = axios
      .get(`http://localhost:8090/courses/${this.$route.params.id}`)
      .then((res) => {
        console.log("data", res.data);
        this.course = res.data;
      })
      .catch((error) => {
        console.error("Failed to get course.", error);
      });
    this.$nextTick(async () => {
      console.log("next tick");
    });
  },
});
</script>

<style lang="scss" scoped>
h1 {
  margin: 20px 0px;
}

.grid {
  display: flex;
  flex-direction: row;

  .col-left {
    flex-basis: 100%;
  }

  .col-right {
    width: 400px;
  }
}

.course-display {
  width: 100%;
  height: 500px;
  background-color: #3e3e3e;
}

.about-course {
  margin-top: 20px;

  h2 {
    margin-bottom: 15px;
  }
}

.course-content-overview {
  padding: 0 15px;

  h3 {
    font-size: 24px;
    padding-bottom: 15px;
  }

  .content-list {
    list-style-type: none;

    .list-item {
      padding: 10px 5px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-grey-2);
      }
    }
  }
}
</style>
