import { ref } from "vue";
import { commerce } from "@/chec/commerce";
import type { Product } from "@chec/commerce.js/types/product";

export const useProduct = (productId: string) => {
  const product = ref<Product | null>(null);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    product.value = null;
    error.value = null;

    try {
      const data = await commerce.products.retrieve(productId);
      product.value = data;
    } catch (err) {
      error.value = `There is an error getting product, error: ${
        (err as Error).message
      }`;
    }
  };

  fetchData();

  return { product, error };
};
