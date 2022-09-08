import { ref } from "vue";
import { commerce } from "@/chec/commerce";
import type { Product } from "@chec/commerce.js/types/product";
import { useRouter } from "vue-router";

interface ErrorExtended extends Error {
  statusCode: number;
}

export const useProduct = (productId: string) => {
  const product = ref<Product | null>(null);
  const error = ref<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    product.value = null;
    error.value = null;

    try {
      const data = await commerce.products.retrieve(productId);
      product.value = data;
    } catch (err) {
      if ((err as ErrorExtended).statusCode === 404) {
        router.push({ name: "404" });
      }
      error.value = `There is an error getting product, error: ${
        (err as Error).message
      }`;
    }
  };

  fetchData();

  return { product, error };
};
