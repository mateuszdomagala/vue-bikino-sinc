<script setup lang="ts">
import type { PropType } from "vue";
import type { Cart } from "@chec/commerce.js/types/cart";
import { useRouter } from "vue-router";
import ShoppingCartItem from "./ShoppingCartItem.vue";
import BaseButton from "@/components/BaseButton.vue";

const router = useRouter();

const props = defineProps({
  cart: {
    type: Object as PropType<Cart>,
    required: true,
  },
});

const emit = defineEmits([
  "update-quantity",
  "remove-from-cart",
  "empty-cart",
  "close-cart",
]);

const emptyCart = () => {
  emit("empty-cart");
};

const handleCheckout = () => {
  router.push({ name: "checkout", params: { cartId: props.cart.id } });
  emit("close-cart");
};
</script>

<template>
  <div class="shopping-cart">
    <div class="shopping-cart__empty">
      Total items: {{ cart.total_items }}
      <BaseButton variant="tertiary" @click="emptyCart" data-testid="btn-empty"
        ><img src="../assets/icons/delete-button.svg" alt="delete button icon"
      /></BaseButton>
    </div>
    <transition name="slide-in" appear>
      <div class="shopping-cart__items">
        <ShoppingCartItem
          v-for="lineItem in cart.line_items"
          :key="lineItem.id"
          :item="lineItem"
          @update-quantity="emit('update-quantity', $event)"
          @remove-from-cart="emit('remove-from-cart', $event)"
        />
      </div>
    </transition>
    <div class="shopping-cart__checkout">
      <div class="shopping-cart__total">
        <p>Subtotal:</p>
        <p>{{ cart.subtotal.formatted_with_symbol }}</p>
      </div>
      <BaseButton
        variant="secondary"
        @click="handleCheckout"
        data-testid="btn-checkout"
        >Checkout</BaseButton
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shopping-cart {
  width: 100%;

  &__empty {
    background-color: var(--color-secondary);
    padding: 1rem;
    margin: -1rem -1rem 1rem -1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;

    & button > img {
      width: 15px;
    }
  }

  &__items {
    margin-bottom: 10rem;

    @media (min-width: 992px) {
      margin-bottom: 0;
    }
  }

  &__checkout {
    margin-top: 1rem;
    background-color: var(--color-secondary);
    padding: 1rem;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;

    & button {
      width: 100%;
    }

    @media (min-width: 992px) {
      position: sticky;
      margin-bottom: -1rem;
    }
  }

  &__total {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
}

.slide-in-enter-active {
  animation: slide-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-in {
  0% {
    transform: translateX(150px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
