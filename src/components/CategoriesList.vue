<script setup lang="ts">
import type { CategoryWithAssets } from "@/composables/useCategories";
import type { PropType } from "vue";
import CategoriesListItem from "./CategoriesListItem.vue";

defineProps({
  categories: {
    type: Array as PropType<CategoryWithAssets[]>,
    default: () => [],
  },
});
</script>

<template>
  <div class="categories">
    <CategoriesListItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </div>
</template>

<style lang="scss" scoped>
.categories {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 65%;
  grid-auto-rows: 100%;
  gap: 2.5rem;
  overflow-x: auto;
  overscroll-behavior-inline: contain;

  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    overflow-x: unset;
  }
}
</style>
