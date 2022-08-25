import { ref } from "vue";
import { commerce } from "@/chec/commerce";
import type { Cart } from "@chec/commerce.js/types/cart";

export const useCart = () => {
  const cart = ref<Cart | null>(null);
  const error = ref<string | null>(null);

  const fetchCart = async () => {
    cart.value = null;
    error.value = null;

    try {
      const data = await commerce.cart.retrieve();
      cart.value = data;
    } catch (err) {
      error.value = `There is an error fetching the cart, error: ${
        (err as Error).message
      }`;
    }
  };

  const addToCart = async (
    productId: string,
    productQuantity?: number,
    productVariant?: { [name: string]: string }
  ) => {
    error.value = null;

    try {
      const data = await commerce.cart.add(
        productId,
        productQuantity,
        productVariant
      );
      cart.value = data.cart;
    } catch (err) {
      error.value = `There is an error when adding to cart, error: ${
        (err as Error).message
      }`;
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    error.value = null;

    try {
      const data = await commerce.cart.update(lineItemId, { quantity });
      cart.value = data.cart;
    } catch (err) {
      error.value = `There is an error updating the cart items, error: ${
        (err as Error).message
      }`;
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    error.value = null;

    try {
      const data = await commerce.cart.remove(lineItemId);
      cart.value = data.cart;
    } catch (err) {
      error.value = `There is an error updating the cart items, error: ${
        (err as Error).message
      }`;
    }
  };

  const emptyCart = async () => {
    error.value = null;

    try {
      const data = await commerce.cart.empty();
      cart.value = data.cart;
    } catch (err) {
      error.value = `There is an error clearing your cart, error: ${
        (err as Error).message
      }`;
    }
  };

  const refreshCart = async () => {
    error.value = null;

    try {
      const data = await commerce.cart.refresh();
      cart.value = data;
    } catch (err) {
      error.value = `There is an error refreshing your cart, error: ${
        (err as Error).message
      }`;
    }
  };

  fetchCart();

  return {
    cart,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
    refreshCart,
  };
};
