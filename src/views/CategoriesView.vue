<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { useCategories } from "@/composables/useCategories";
import BaseHeadline from "../components/BaseHeadline.vue";
import CategoriesList from "../components/CategoriesList.vue";

const { categories, error } = useCategories();
</script>

<template>
  <main>
    <section id="categories">
      <BaseHeadline type="h1" text="categories" :line="true" />
      <div v-if="categories?.length" class="categories__list">
        <CategoriesList :categories="categories" />
      </div>
      <div v-if="error" class="categories__error">{{ error }}</div>
    </section>
  </main>
  <div class="linear-background"></div>
</template>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(11, 1fr);
  height: 100vh;
}

.categories {
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__list,
  &__error {
    grid-area: 4 / 2 / 12 / 11;
    z-index: 3;
    animation: fade-in 2s;

    @media (min-width: 992px) {
      grid-area: 5 / 2 / 11 / 10;
    }

    @media (min-width: 992px) and (max-width: 1400px) and (-webkit-min-device-pixel-ratio: 1.25) {
      align-self: center;
    }
  }

  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--text-color-primary-light-1);
  }
}

.headline {
  grid-area: 2 / 2 / 4 / 11;
  animation: fade-in 2s;

  @media (min-width: 992px) {
    grid-area: 2 / 2 / 4 / 11;
    font-size: 7rem;
  }

  @media (min-width: 992px) and (max-width: 1400px) and (-webkit-min-device-pixel-ratio: 1.25) {
    grid-area: 2 / 2 / 4 / 11;
    font-size: 5rem;
  }
}

.linear-background {
  display: none;

  @media (min-width: 992px) {
    display: block;
    min-height: 100vh;
    min-width: 100%;
    background: linear-gradient(90deg, #cccccc 0.5%, transparent 1%);
    background-size: 10% 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 50%;
    z-index: 2;
    animation: image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 1s backwards;
  }
}
</style>
