<script setup lang="ts">
import type { CategoryWithAssets } from "@/composables/useCategories";
import type { PropType } from "vue";
import BaseLink from "./BaseLink.vue";

defineProps({
  category: {
    type: Object as PropType<CategoryWithAssets>,
    required: true,
  },
});
</script>

<template>
  <BaseLink :to="{ name: '', params: { query: category.id } }">
    <div class="category__card">
      <div class="category__image">
        <img
          :src="category.assets[0].url"
          :alt="category.assets[0].description || undefined"
        />
      </div>
      <div class="category__details">
        <h3>{{ category.name }}</h3>
        <p>{{ category.description }}</p>
      </div>
    </div>
  </BaseLink>
</template>

<style lang="scss" scoped>
.category {
  &__card {
    max-height: 630px;

    @media (min-width: 992px) {
      max-height: unset;
    }
  }
  &__image {
    overflow: hidden;
    max-height: 550px;

    @media (min-width: 992px) {
      max-height: unset;
    }

    & img {
      width: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      transform: scale(1.1);

      &:hover {
        transform: scale(1.5);
      }
    }
  }

  &__details {
    padding-top: 0.5rem;

    @media (min-width: 1480px) {
      display: flex;
      align-items: center;
    }

    & h3 {
      font-size: 1.5rem;
      font-weight: 400;
      text-transform: lowercase;

      @media (min-width: 992px) {
        font-size: 2.5rem;
        margin-right: 3rem;
      }

      @media (min-width: 992px) and (max-height: 751px) {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
