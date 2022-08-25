<script setup lang="ts">
import { ref, provide  } from "vue";
import { RouterView } from "vue-router";
import { useCart } from "@/composables/useCart";
import TheHeader from "./components/TheHeader.vue";
import BaseModal from "./components/BaseModal.vue";
import ShoppingCart from "./components/ShoppingCart.vue";

const isModalOpen = ref<boolean>(false);
const isContentVisible = ref<boolean>(false);

const { cart, error, addToCart, updateQuantity, removeFromCart, emptyCart, refreshCart } =
  useCart();

provide("cart", cart);
provide("refreshCart", refreshCart);

const toggleModalContent = () => {
  isContentVisible.value = !isContentVisible.value;
};

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
  isContentVisible.value = true;
};

const handleAddToCart = async (
  productId: string,
  productQuantity: number,
  productVariant: { [name: string]: string }
) => {
  await addToCart(productId, productQuantity, productVariant);
};

const handleUpdateQuantity = async ({
  lineItemId,
  quantity,
}: {
  lineItemId: string;
  quantity: number;
}) => {
  await updateQuantity(lineItemId, quantity);
};

const handleRemoveFromCart = async ({ lineItemId }: { lineItemId: string }) => {
  await removeFromCart(lineItemId);
};

const handleEmptyCart = async () => {
  await emptyCart();
};
</script>

<template>
  <TheHeader
    :cart-total-items="cart?.total_items"
    @shopping-cart="toggleModal"
  />
  <RouterView @add-to-cart="handleAddToCart" />
  <BaseModal
    variant="right"
    :visible-modal="isModalOpen"
    :visible-content="isContentVisible"
    @close="toggleModal"
  >
    <template v-slot:header>Shopping Cart</template>
    <template v-slot:content>
      <ShoppingCart
        v-if="cart?.line_items.length"
        :cart="cart"
        @update-quantity="handleUpdateQuantity"
        @remove-from-cart="handleRemoveFromCart"
        @empty-cart="handleEmptyCart"
        @close-cart="toggleModalContent"
      />
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        You have no items in your shopping cart, start adding some!
      </div>
    </template>
  </BaseModal>
</template>

<style>
@import "@/assets/styles/base.css";
</style>
