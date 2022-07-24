import { ref } from "vue";
import { commerce } from "@/chec/commerce";
import type { Product } from "@chec/commerce.js/types/product";
import type { PaginationMeta } from "@chec/commerce.js/types/pagination";

export const useProducts = (params = {}) => {
  const products = ref<Product[] | null>([]);
  const metadata = ref<PaginationMeta | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  const fetchData = async (params = {}) => {
    products.value = null;
    metadata.value = null;
    error.value = null;
    isLoading.value = true;

    try {
      const { data, meta } = await commerce.products.list(params);
      products.value = data;
      metadata.value = meta;
      isLoading.value = false;
    } catch (err) {
      error.value = `There is an error getting products, error: ${
        (err as Error).message
      }`;
      isLoading.value = false;
    }
  };

  fetchData(params);

  return { products, metadata, error, isLoading, fetchData };
};
