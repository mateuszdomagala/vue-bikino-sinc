<script setup lang="ts">
import { useCategories } from "@/composables/useCategories";
import CategoriesList from "./CategoriesList.vue";
import BaseHeadline from "./BaseHeadline.vue";
import BaseLink from "./BaseLink.vue";

const { categories, error } = useCategories();
</script>

<template>
  <section id="store">
    <div class="store__headline">
      <BaseHeadline type="h2" text="now in store" :line="true" />
    </div>
    <CategoriesList
      v-if="categories?.length"
      class="store__categories snaps-inline"
      :categories="categories.slice(0, 3)"
    />
    <div v-if="error" class="store__error">{{ error }}</div>
    <BaseLink to="/categories" variant="primary">+</BaseLink>
    <p class="store__description">
      Shop the bikino sinc collection. New styles added.
    </p>
    <BaseLink to="/shop" variant="secondary">Shop All Collection</BaseLink>
  </section>
</template>

<style lang="scss" scoped>
.snaps-inline {
  scroll-snap-type: x mandatory;
}
.spans-inline > * {
  scroll-snap-align: start;
}
.store {
  &__headline {
    grid-area: 1 / 2 / 2 / 10;

    @media (min-width: 992px) {
      grid-area: 1 / 2 / 2 / 8;
    }
  }

  &__categories,
  &__error {
    grid-area: 2 / 2 / 9 / 11;
    z-index: 3;

    @media (min-width: 992px) {
      grid-area: 3 / 2 / 10 / 8;
    }
  }

  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--text-color-primary-light-1);
  }

  &__description {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 6 / 8 / 8 / 10;
      font-weight: 400;
      color: var(--text-color-primary-light-1);
      padding: 0 50px;
    }
  }
}

.link--primary {
  display: none;

  @media (min-width: 992px) {
    display: flex;
    grid-area: 3 / 8 / 5 / 9;
    font-size: 2rem;
    z-index: 3;
  }
}

.link--secondary {
  grid-area: 10 / 2 / 11 / 10;

  @media (min-width: 992px) {
    grid-area: 11 / 4 / 11 / 8;
    align-self: end;
    justify-self: center;
    z-index: 3;
  }
}
</style>
