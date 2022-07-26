<script setup lang="ts">
import type { PropType } from "vue";
import type { Product } from "@chec/commerce.js/types/product";
import ProductsListItem from "./ProductsListItem.vue";

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
});
</script>

<template>
  <div class="products">
    <ProductsListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style lang="scss">
.products {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 5rem 3rem;

  @media (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
