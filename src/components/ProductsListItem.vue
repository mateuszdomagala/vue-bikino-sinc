<script setup lang="ts">
import type { PropType } from "vue";
import type { Product } from "@chec/commerce.js/types/product";
import BaseLink from "./BaseLink.vue";

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<template>
  <BaseLink :to="{ name: 'product', params: { id: product.id } }">
    <div class="product__card">
      <div class="product__image">
        <img :src="product.image?.url" :alt="product.description" />
      </div>
      <div class="product__details">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price.formatted_with_symbol }}</p>
      </div>
    </div>
  </BaseLink>
</template>

<style lang="scss" scoped>
.product {
  &__image {
    position: relative;
    overflow: hidden;

    & img {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      transform: scale(1.1);
      transition: transform 0.5s ease;

      @media (min-width: 992px) {
        aspect-ratio: 1 / 1.2;
      }

      @media (min-width: 1440px) {
        aspect-ratio: 1 / 1.5;
      }

      &:hover {
        transform: scale(1.5);
      }
    }
  }

  &__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    & h3 {
      font-weight: 400;
    }

    & p {
      font-weight: 700;
    }
  }
}
</style>
