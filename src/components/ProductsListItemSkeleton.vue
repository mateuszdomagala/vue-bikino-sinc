<script setup lang="ts">
import BaseSkeleton from "./BaseSkeleton.vue";
</script>

<template>
  <div class="product__card-skeleton">
    <BaseSkeleton type="box" width="auto" height="auto" />
    <div class="product__card-skeleton__details">
      <BaseSkeleton />
      <BaseSkeleton width="4rem" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  aspect-ratio: 1 / 1;

  @media (min-width: 992px) {
    aspect-ratio: 1 / 1.2;
  }

  @media (min-width: 1440px) {
    aspect-ratio: 1 / 1.5;
  }
}

.product {
  &__card-skeleton__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
}
</style>
