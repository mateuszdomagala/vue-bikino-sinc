<script setup lang="ts">
import BaseHeadline from "./BaseHeadline.vue";
import BaseNumber from "./BaseNumber.vue";
import BaseButton from "./BaseButton.vue";
import BaseLink from "./BaseLink.vue";
import CarouselSlider from "./CarouselSlider.vue";
import { useProducts } from "../composables/useProducts";
import CarouselSliderItem from "./CarouselSliderItem.vue";

const { products, error } = useProducts({ limit: 5 });
</script>

<template>
  <section id="explore-more">
    <div class="explore-more__image">
      <picture>
        <source
          srcset="../assets/images/explore-more-outfit--large.jpg"
          media="(min-width: 992px)"
        />
        <source
          srcset="../assets/images/explore-more-outfit--medium.jpg"
          media="(min-width: 640px)"
        />
        <img
          src="../assets/images/explore-more-outfit--small.jpg"
          alt="Woman in orange outfit"
          loading="lazy"
        />
      </picture>
    </div>
    <BaseHeadline class="explore-more__headline-1" text="explore more" />
    <BaseHeadline class="explore-more__headline-2" text="bikino sinc 2019" />
    <p class="explore-more__description">
      Discover the latest trends with our newest arrivals for women. Shop the
      hottest in jeans, moto jackets, pants and more.
    </p>
    <div class="explore-more__number"><BaseNumber number="03" /></div>
    <CarouselSlider
      v-if="products?.length"
      :slide-count="products.length"
      v-slot="{ currentActiveSlide, nextSlide, prevSlide }"
    >
      <CarouselSliderItem
        v-for="(product, index) in products"
        :key="index"
        class="carousel__slide"
      >
        <img
          v-show="index === currentActiveSlide"
          :src="product.image?.url"
          :alt="product.description"
          loading="lazy"
        />
      </CarouselSliderItem>
      <div class="carousel__buttons">
        <BaseButton variant="tertiary" @click="nextSlide">&xlarr;</BaseButton>
        <BaseButton variant="tertiary" @click="prevSlide">&xrarr;</BaseButton>
      </div>
    </CarouselSlider>
    <div v-if="error" class="carousel--error">{{ error }}</div>
    <div class="explore-more__button">
      <BaseLink variant="secondary" to="/shop">Shop Now</BaseLink>
    </div>
    <div class="explore-more__orange-line"></div>
  </section>
</template>

<style lang="scss" scoped>
.explore-more {
  &__image {
    grid-area: 1 / 1 / 4 / 11;

    @media (min-width: 992px) {
      grid-area: 1 / 6 / 9 / 11;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 0% 55%;
    }
  }

  &__headline-1 {
    grid-area: 4 / 2 / 5 / 10;
    align-self: center;

    @media (min-width: 992px) {
      grid-area: 2 / 3 / 2 / 8;
      font-size: 3rem;
      align-self: end;
      justify-self: center;
    }

    @media (min-width: 1127px) {
      grid-area: 2 / 4 / 2 / 7;
      font-size: 3rem;
      align-self: end;
      justify-self: center;
    }
  }

  &__headline-2 {
    grid-area: 4 / 2 / 6 / 10;
    padding-top: 1rem;
    align-self: center;

    @media (min-width: 992px) {
      grid-area: 3 / 5 / 4 / 9;
      font-size: 3rem;
      padding-top: 0;
      align-self: auto;
    }
  }

  &__description {
    grid-area: 5 / 2 / 7 / 10;
    align-self: center;
    font-weight: 400;
    padding-top: 2.5rem;
    color: var(--text-color-primary-light-2);

    @media (min-width: 992px) {
      grid-area: 4 / 5 / 4 / 8;
      align-self: auto;
      padding-top: 0;
    }

    @media (min-width: 1324px) {
      grid-area: 4 / 5 / 4 / 7;
    }
  }

  &__number {
    grid-area: 7 / 2 / 10 / 4;
    z-index: -1;

    @media (min-width: 992px) {
      grid-area: 5 / 4 / 5 / 4;
      align-self: center;
    }
  }

  &__button {
    grid-area: 10 / 5 / 11 / 11;
    align-self: center;
    justify-self: center;
    z-index: 3;

    @media (min-width: 992px) {
      grid-area: 10 / 7 / 11 / 10;
    }
  }

  &__orange-line {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 1 / 3 / 2 / 4;
      width: 2%;
      height: 50%;
      margin-left: -1px;
      background-color: var(--color-primary);
    }
  }
}

.carousel {
  grid-area: 8 / 2 / 12 / 10;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);

  @media (min-width: 992px) {
    grid-area: 6 / 3 / 12 / 8;
  }

  &__slide {
    grid-area: 1 / 1 / 4 / 5;
    overflow: hidden;

    @media (min-width: 992px) {
      grid-area: 1 / 2 / 4 / 5;
    }
  }

  &__buttons {
    grid-area: 3 / 4 / 3 / 6;
    align-self: center;
    display: flex;
    justify-content: space-between;
    z-index: 3;

    @media (min-width: 992px) {
      grid-area: 2 / 1 / 2 / 6;
      align-self: start;
    }
  }

  &--error {
    grid-area: 6 / 4 / 12 / 7;
    background-color: var(--text-color-primary-light-1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
