import { ref } from "vue";
import { commerce } from "@/chec/commerce";
import type { ShippingMethod } from "@chec/commerce.js/types/shipping-method";
import type { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import type { Live } from "@chec/commerce.js/types/live";
import type { Price } from "@chec/commerce.js/types/price";
import type { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import type { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";

interface ShippingMethodExtended extends ShippingMethod {
  regions: {
    US: string[];
  };
}

interface LiveExtended extends Omit<Live, "shipping"> {
  shipping: {
    available_options: ShippingMethodExtended[];
    price: Price;
  };
}

interface CheckoutTokenExtended
  extends Omit<CheckoutToken, "shipping_methods" | "live"> {
  shipping_methods: ShippingMethodExtended[];
  live: LiveExtended;
}

export const useCheckout = (cartId: string) => {
  const checkoutToken = ref<CheckoutTokenExtended | null>(null);
  const order = ref<CheckoutCaptureResponse | null>(null);
  const error = ref<string | null>(null);

  const generateCheckoutToken = async () => {
    checkoutToken.value = null;
    error.value = null;

    try {
      const data = await commerce.checkout.generateToken(cartId, {
        type: "cart",
      });
      checkoutToken.value = data as CheckoutTokenExtended;
    } catch (err) {
      error.value = `There was an error in generating a token, error: ${
        (err as Error).message
      }`;
    }
  };

  const captureCheckout = async (
    checkoutToken: string,
    orderData: CheckoutCapture
  ) => {
    order.value = null;
    error.value = null;

    try {
      const data = await commerce.checkout.capture(checkoutToken, orderData);
      order.value = data;
    } catch (err) {
      error.value = `There was an error confirming your order, error: ${
        (err as Error).message
      }`;
    }
  };

  generateCheckoutToken();

  return {
    checkoutToken,
    captureCheckout,
    order,
    error,
  };
};
