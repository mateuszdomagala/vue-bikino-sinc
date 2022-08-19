<script setup lang="ts">
import type { PropType } from "vue";
import type { LineItem } from "@chec/commerce.js/types/line-item";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  item: {
    type: Object as PropType<LineItem>,
    required: true,
  },
});

const emit = defineEmits(["update-quantity", "remove-from-cart"]);

const updateQuantity = (quantity: number) => {
  if (quantity < 1) {
    return removeFromCart();
  }
  emit("update-quantity", { lineItemId: props.item.id, quantity: quantity });
};

const removeFromCart = () => {
  emit("remove-from-cart", { lineItemId: props.item.id });
};
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img :src="item.image?.url" :alt="item.product_name" loading="lazy" />
      <BaseButton
        variant="primary"
        data-testid="btn-remove"
        @click="removeFromCart"
      >
        Remove
      </BaseButton>
    </div>
    <div class="cart-item__details">
      <h4 class="cart-item__details-name">{{ item.name }}</h4>
      <p class="cart-item__details-variant">
        Size: {{ item.selected_options[0].option_name }}
      </p>
      <p class="cart-item__details-price">
        {{ item.line_total.formatted_with_symbol }}
      </p>
      <div class="cart-item__details-qty">
        <BaseButton
          variant="primary"
          @click="() => updateQuantity(item.quantity - 1)"
          data-testid="btn-decrease"
          >-</BaseButton
        >
        <p>{{ item.quantity }}</p>
        <BaseButton
          variant="primary"
          @click="() => updateQuantity(item.quantity + 1)"
          data-testid="btn-increase"
          >+</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  gap: 1rem;

  &:not(:first-child) {
    margin: 1rem 0;
  }

  &__image {
    position: relative;

    & button {
      position: absolute;
      padding: 0.2rem;
      bottom: 0;
      left: 0;
      right: 0;
    }

    & img {
      width: 140px;
      height: 140px;
      object-fit: cover;
    }
  }

  &__details-name {
    text-transform: uppercase;
  }

  &__details-qty {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & button {
      width: 1rem;
      height: 1rem;
      background-color: var(--text-color-primary-light-1);
    }
  }
}
</style>
