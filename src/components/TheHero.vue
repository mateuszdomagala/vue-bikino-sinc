<script setup lang="ts">
import CarouselSlider from "./CarouselSlider.vue";
import CarouselSliderItem from "./CarouselSliderItem.vue";
import BaseNumber from "./BaseNumber.vue";
import BaseButton from "./BaseButton.vue";
import BaseLink from "./BaseLink.vue";

const carouselSlides = [
  {
    img: {
      small: "long-sleeved-dress--small",
      medium: "long-sleeved-dress--medium",
      large: "long-sleeved-dress--large",
    },
    description: "Bikino Sinc long sleeved dress",
  },
  {
    img: {
      small: "hoodie-dress--small",
      medium: "hoodie-dress--medium",
      large: "hoodie-dress--large",
    },
    description: "Bikino Sinc hoodie dress",
  },
  {
    img: {
      small: "sleeveless-dress--small",
      medium: "sleeveless-dress--medium",
      large: "sleeveless-dress--large",
    },
    description: "Bikino Sinc sleeveless dress",
  },
  {
    img: {
      small: "crete-dress--small",
      medium: "crete-dress--medium",
      large: "crete-dress--large",
    },
    description: "Bikino Sinc crete dress",
  },
];

const getImageUrl = (slide: string) => {
  return new URL(`../assets/images/${slide}.jpg`, import.meta.url).href;
};
</script>

<template>
  <section id="hero-section">
    <div class="hero-section__number-01"><BaseNumber /></div>
    <div class="hero-section__description-01">
      Your life is eclectic and unexpected and, now, so is your wardrobe.
    </div>
    <div class="hero-section__number-02"><BaseNumber number="02" /></div>
    <div class="hero-section__description-02">
      This orange colour channel a fun, youthful vibe into party dress fashion.
    </div>
    <h1 class="hero-section__headline">
      bikino<br /><span class="hero-section__headline-line" />sinc
    </h1>
    <BaseLink href="#explore-more" variant="primary"
      >More<br />Details</BaseLink
    >
    <CarouselSlider
      :slide-count="carouselSlides.length"
      :auto-play="true"
      :timeout="7000"
      v-slot="{ currentActiveSlide, nextActiveSlide, nextSlide, prevSlide }"
    >
      <CarouselSliderItem
        v-for="(slide, index) in carouselSlides"
        :key="index"
        class="carousel__slide-main"
      >
        <picture>
          <source
            :srcset="getImageUrl(slide.img.large)"
            media="(min-width: 992px)"
          />
          <source
            :srcset="getImageUrl(slide.img.medium)"
            media="(min-width: 640px)"
          />
          <img
            v-show="index === currentActiveSlide"
            :src="getImageUrl(slide.img.small)"
            :alt="slide.description"
            loading="lazy"
          />
        </picture>
      </CarouselSliderItem>
      <CarouselSliderItem
        v-for="(slide, index) in carouselSlides"
        :key="index"
        class="carousel__slide-secondary"
      >
        <picture>
          <source
            :srcset="getImageUrl(slide.img.large)"
            media="(min-width: 992px)"
          />
          <source
            :srcset="getImageUrl(slide.img.medium)"
            media="(min-width: 640px)"
          />
          <img
            v-show="index === nextActiveSlide"
            :src="getImageUrl(slide.img.small)"
            :alt="slide.description"
            loading="lazy"
          />
        </picture>
      </CarouselSliderItem>
      <div class="carousel__buttons">
        <BaseButton variant="tertiary" @click="nextSlide">&xlarr;</BaseButton>
        <BaseButton variant="tertiary" @click="prevSlide">&xrarr;</BaseButton>
      </div>
    </CarouselSlider>
    <div class="hero-section__shop">Shop</div>
    <div class="hero-section__orange-line"></div>
    <div class="hero-section__lifestyle">Lifestyle</div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  &__number-01 {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 4 / 2 / 5 / 3;
      animation: fade-in 2s;

      & .number {
        color: var(--text-color-primary);
      }
    }
  }

  &__description-01 {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 8 / 2 / 10 / 3;
      color: var(--text-color-primary-light-1);
      align-self: end;
      animation: fade-in 2s;
      font-size: 0.75rem;
    }

    @media (min-width: 1461px) {
      font-size: 1rem;
    }

    @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
      font-size: 0.65rem;
    }
  }

  &__number-02 {
    grid-area: 3 / 3 / 5 / 10;
    justify-self: end;
    margin-right: -6px;
    z-index: -1;
    animation: fade-in 2s;

    @media (min-width: 992px) {
      grid-area: 4 / 9 / 5 / 10;
      justify-self: center;
      font-size: 2rem;
      line-height: 1.4rem;
    }
  }

  &__description-02 {
    grid-area: 2 / 3 / 4 / 10;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    color: var(--text-color-primary-light-2);
    animation: fade-in 2s;

    @media (min-width: 992px) {
      grid-area: 3 / 6 / 4 / 9;
      font-size: 1rem;
    }

    @media (min-width: 1200px) {
      grid-area: 3 / 6 / 4 / 8;
      font-size: 1.06rem;
    }

    @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
      font-size: 0.8rem;
    }
  }

  &__headline {
    grid-area: 6 / 2 / 10 / 11;
    z-index: 2;
    font-family: "Ubuntu", sans-serif;
    font-weight: 700;
    font-size: 5rem;
    line-height: 5rem;
    color: var(--text-color-primary);
    position: relative;

    animation-name: clip-text;
    animation-delay: 2s;
    animation-duration: 800ms;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);

    @media (min-width: 992px) {
      grid-area: 5 / 4 / 10 / 9;
      font-size: 8.3rem;
      line-height: 0.9;
      margin-left: -10px;
    }

    @media (min-width: 1200px) {
      font-size: 10.3rem;
    }

    @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
      font-size: 8.3rem;
    }

    &-line {
      display: inline-block;
      vertical-align: middle;
      width: 1em;
      border-top: 0.15rem solid;
      margin-right: 1.4rem;

      @media (min-width: 992px) {
        width: 7rem;
        margin-right: 5rem;
        margin-left: 10px;
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--color-primary);
      pointer-events: none;

      animation-name: text-revealer;
      animation-delay: 2s;
      animation-duration: 800ms;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  &__shop {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 9 / 3 / 11 / 4;
      align-self: end;
      justify-self: start;
      animation: fade-in 2s;
      transform: rotate(270deg);
      font-size: 2rem;
      font-family: "Ubuntu", sans-serif;
      font-weight: 700;
      margin-left: -25px;
    }
  }

  &__orange-line {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 6 / 10 / 7;
      width: 2%;
      height: 50%;
      margin-left: -1px;
      background-color: var(--color-primary);
      animation: fade-in 2s;
    }
  }

  &__lifestyle {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 10 / 9 / 11 / 10;
      justify-self: end;
      align-self: start;
      margin-right: -27px;
      animation: fade-in 2s;
      transform: rotate(270deg);
      font-family: "Ubuntu", sans-serif;
      font-weight: 700;
      backface-visibility: hidden;
      color: var(--text-color-primary);
    }
  }
}

.link--primary {
  grid-area: 10 / 1 / 12 / 5;
  z-index: 3;
  animation: fade-in 2s;

  @media (min-width: 992px) {
    grid-area: 10 / 5 / 12 / 6;
  }
}

.carousel {
  grid-area: 4 / 1 / 12 / 10;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__slide-main {
    grid-area: 1 / 3 / 9 / 10;
    overflow: hidden;
    animation: image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 2s backwards;

    @media (min-width: 992px) {
      grid-area: 1 / 6 / 10 / 9;
    }
  }

  &__slide-secondary {
    display: none;

    @media (min-width: 992px) {
      display: block;
      grid-area: 2 / 1 / 6 / 3;
      overflow: hidden;
      animation: image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 2s backwards;
    }
  }

  &__buttons {
    grid-area: 9 / 8 / 10 / 10;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 3;
    animation: fade-in 2s;
  }
}

@keyframes clip-text {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes text-revealer {
  0%,
  50% {
    transform-origin: 0 50%;
  }

  60%,
  100% {
    transform-origin: 100% 50%;
  }

  60% {
    transform: scaleX(1);
  }

  100% {
    transform: scaleX(0);
  }
}
</style>
