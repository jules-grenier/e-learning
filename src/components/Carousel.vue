<template>
  <swiper :slides-per-view="1" :space-between="50" navigation pagination loop autoplay>
    <swiper-slide v-for="slide in slides" :key="slide.id">
      <img :src="slide.image" :alt="slide.alt" />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default defineComponent({
  components: { Swiper, SwiperSlide },
  data() {
    return {
      slides: [
        { id: 1, image: "https://via.placeholder.com/1440x400", alt: "slide 1" },
        { id: 2, image: "https://via.placeholder.com/1440x400", alt: "slide 2" },
        { id: 3, image: "https://via.placeholder.com/1440x400", alt: "slide 3" },
      ],
    };
  },
});
</script>

<style lang="sass" scoped></style>
