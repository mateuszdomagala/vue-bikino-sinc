<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  slideCount: number;
  autoPlay?: boolean;
  timeout?: number;
}>();

const currentActiveSlide = ref(0);
const slideCount = ref(props.slideCount);
const autoPlayEnabled = ref(
  props.autoPlay === undefined ? false : props.autoPlay
);
const timeoutDuration = ref(props.timeout === undefined ? 5000 : props.timeout);

const nextActiveSlide = computed(() => {
  return currentActiveSlide.value + 1 >= slideCount.value
    ? 0
    : currentActiveSlide.value + 1;
});

const nextSlide = () => {
  currentActiveSlide.value === slideCount.value - 1
    ? (currentActiveSlide.value = 0)
    : (currentActiveSlide.value += 1);
};

const prevSlide = () => {
  currentActiveSlide.value === 0
    ? (currentActiveSlide.value = slideCount.value - 1)
    : (currentActiveSlide.value -= 1);
};

const autoPlay = () => {
  setInterval(() => {
    nextSlide();
  }, timeoutDuration.value);
};

if (autoPlayEnabled.value) {
  autoPlay();
}
</script>

<template>
  <div class="carousel">
    <slot
      :currentActiveSlide="currentActiveSlide"
      :nextActiveSlide="nextActiveSlide"
      :nextSlide="nextSlide"
      :prevSlide="prevSlide"
    />
  </div>
</template>
