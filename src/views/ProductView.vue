<script setup lang="ts">
import { ref } from "vue";
import { useProduct } from "@/composables/useProduct";
import CarouselSlider from "@/components/CarouselSlider.vue";
import CarouselSliderItem from "@/components/CarouselSliderItem.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseTabs from "../components/BaseTabs.vue";
import BaseTabsItem from "../components/BaseTabsItem.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

const { product, error } = useProduct(props.id);

const selectedVariant = ref<string | null>(null);
const isVariantSelected = ref<boolean>(false);
const isModalOpen = ref<boolean>(false);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const handleAddToCart = async () => {
  let variant;

  selectedVariant.value
    ? (isVariantSelected.value = false)
    : (isVariantSelected.value = true);

  if (product.value?.variant_groups && selectedVariant.value) {
    variant = { [product.value?.variant_groups[0].id]: selectedVariant.value };
    emit("add-to-cart", props.id, 1, variant);
    selectedVariant.value = null;
  }
};
</script>

<template>
  <main>
    <div class="product__images">
      <CarouselSlider
        v-if="product"
        :slide-count="product.assets.length"
        v-slot="{ currentActiveSlide, nextSlide, prevSlide }"
      >
        <CarouselSliderItem
          v-for="(image, index) in product.assets"
          :key="index"
          class="carousel__slide"
        >
          <img
            v-show="index === currentActiveSlide"
            :src="image.url"
            :alt="image.filename"
          />
        </CarouselSliderItem>
        <div class="carousel__buttons">
          <BaseButton variant="tertiary" @click="nextSlide">&xlarr;</BaseButton>
          <BaseButton variant="tertiary" @click="prevSlide">&xrarr;</BaseButton>
        </div>
      </CarouselSlider>
    </div>
    <div class="product__help">
      <p><span class="question-mark">?</span>Need help?</p>
      <BaseButton variant="primary" @click="toggleModal"
        >Size<br />Guide</BaseButton
      >
    </div>
    <div class="product__details">
      <div class="product__details-content">
        <div>
          <div class="product__details__header">
            <h1>{{ product?.name }}</h1>
            <p>{{ product?.price.formatted_with_symbol }}</p>
          </div>
          <div
            class="product__details__description"
            v-html="product?.description"
          ></div>
        </div>
        <div>
          <div class="product__details__options">
            <div
              v-for="(option, index) in product?.variant_groups[0].options"
              :key="index"
              class=""
            >
              <input
                type="radio"
                :name="option.name"
                :id="option.name"
                :value="option.id"
                v-model="selectedVariant"
              />
              <label :for="option.name">{{ option.name }}</label>
            </div>
            <BaseButton variant="secondary" @click="handleAddToCart"
              >Add to bag</BaseButton
            >
            <p v-if="isVariantSelected" class="product__details__warning">
              Please select a size
            </p>
            <p v-if="error" class="product__details__error">
              {{ error }}
            </p>
          </div>
          <BaseTabs v-if="product">
            <BaseTabsItem :title="product.attributes[0].name">{{
              product.attributes[0].value
            }}</BaseTabsItem>
            <BaseTabsItem :title="product.attributes[1].name">{{
              product.attributes[1].value
            }}</BaseTabsItem>
          </BaseTabs>
        </div>
      </div>
    </div>
    <BaseModal :visible="isModalOpen" @close="toggleModal">
      <template v-slot:header>Size Guide</template>
      <template v-slot:content>
        <div class="modal__content">
          <p>
            Our sizes are based on Italian sizing. Match our sizes to yours with
            the help of the chart below. We have also included some helpful tips
            for measuring yourself accurately at the bottom of this page.
          </p>
          <p>
            <strong>Bust:</strong> Measure around the fullest part of your bust.
          </p>
          <p>
            <strong>Natural Waist:</strong> Measure around your natural waist,
            at narrowest point.
          </p>
          <p>
            <strong>Waist:</strong> Measure around your waist, slightly below
            your natural waist, where you normally wear your trousers.
          </p>
          <p>
            <strong>Hip:</strong> Measure around the fullest part of your hips.
          </p>
        </div>
      </template>
    </BaseModal>
    <div class="orange-line"></div>
  </main>
  <div class="linear-background"></div>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(11, 1fr);
  height: 100vh;
  animation: fade-in 2s;
}

.product {
  &__images {
    grid-area: 1 / 1 / 6 / 11;

    @media (min-width: 992px) {
      grid-area: 1 / 1 / 10 / 6;
    }

    & .carousel {
      position: relative;
      height: 100%;
      width: 100%;

      &__slide {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      &__buttons {
        position: absolute;
        bottom: 5%;
        right: 5%;
        display: flex;
        gap: 2rem;
        z-index: 3;
      }
    }
  }

  &__help {
    grid-area: 6 / 2 / 7 / 11;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1, 1fr);

    @media (min-width: 992px) {
      grid-area: 10 / 1 / 12 / 6;
    }

    & p {
      grid-area: 1 / 1 / 1 / 3;
      align-self: center;

      @media (min-width: 992px) {
        grid-area: 1 / 2 / 1 / 4;
      }
    }

    & button {
      grid-area: 1 / 5 / 1 / 6;
      z-index: 3;

      @media (min-width: 992px) {
        grid-area: 1 / 5 / 1 / 6;
      }
    }

    & .question-mark {
      display: inline-block;
      font-weight: 700;
      color: var(--text-color-secondary);
      background-color: var(--text-color-primary);
      border-radius: 50%;
      width: 1.3rem;
      height: 1.3rem;
      line-height: 1.3rem;
      text-align: center;
      margin-right: 0.5rem;
    }
  }

  &__details {
    grid-area: 7 / 2 / 12 / 10;

    @media (min-width: 992px) {
      grid-area: 1 / 6 / 12 / 11;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(
        to bottom,
        var(--background-color-secondary) 55%,
        var(--background-color-primary) 55% 100%
      );
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      height: 100%;

      @media (min-width: 992px) {
        width: 60%;
        gap: 4rem;
      }

      & > div:first-child {
        @media (min-width: 992px) {
          height: 55%;
          width: 90%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 2rem;
        }
      }

      & > div:last-child {
        @media (min-width: 992px) {
          height: 45%;
          width: 90%;
          z-index: 3;
        }
      }
    }

    &__header {
      & h1 {
        font-weight: 300;

        @media (min-width: 992px) {
          font-size: 2.5rem;
        }

        @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
          font-size: 2rem;
        }
      }

      & p {
        font-weight: 700;
        font-size: 2rem;
        color: var(--color-primary);

        @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
          font-size: 1.5rem;
        }
      }
    }

    &__description {
      display: none;

      @media (min-width: 992px) {
        display: block;
        color: var(--text-color-primary-light-2);
      }

      @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
        font-size: 0.9rem;
      }
    }

    &__options {
      z-index: 3;

      @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
        margin-top: 1rem;
        font-size: 0.9rem;
      }

      & > div {
        display: inline-block;
        margin-right: 1rem;
      }

      & input[type="radio"] {
        opacity: 0;
        width: 0;

        &:checked + label,
        &:focus + label {
          border-color: var(--text-color-primary);
        }
      }

      & label {
        display: inline-block;
        font-weight: 700;
        cursor: pointer;
        border-bottom: 2px solid transparent;

        &:hover {
          border-color: var(--text-color-primary);
        }
      }

      & button {
        margin-top: 2rem;

        @media (min-width: 992px) {
          margin-top: 3rem;
        }

        @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
          margin-top: 1rem;
        }
      }
    }

    &__warning,
    &__error {
      color: var(--color-primary);
      padding-top: 1rem;
      margin-bottom: -2.6rem;
    }
  }
}

.tabs {
  margin-top: 5rem;

  @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
    margin-top: 3rem;
    font-size: 0.9rem;
  }
}

.tab-content {
  @media (min-width: 992px) and (-webkit-min-device-pixel-ratio: 1.25) {
    font-size: 0.9rem;
  }
}

.modal__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.orange-line {
  display: none;

  @media (min-width: 992px) {
    display: block;
    grid-area: 5 / 10 / 6;
    width: 2%;
    height: 50%;
    margin-left: -1px;
    background-color: var(--color-primary);
    animation: fade-in 2s;
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
