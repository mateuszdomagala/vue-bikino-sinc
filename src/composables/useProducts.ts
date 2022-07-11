import { ref } from "vue";
import { commerce } from "@/chec/commerce";
import type { Product } from "@chec/commerce.js/types/product";
import type { PaginationMeta } from "@chec/commerce.js/types/pagination";

export const useProducts = (params = {}) => {
  const products = ref<Product[] | null>([]);
  const metadata = ref<PaginationMeta | null>(null);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    products.value = null;
    metadata.value = null;
    error.value = null;

    try {
      const { data, meta } = await commerce.products.list(params);
      products.value = data;
      metadata.value = meta;
    } catch (err) {
      error.value = `There is an error getting products, error: ${
        (err as Error).message
      }`;
    }
  };

  fetchData();

  return { products, metadata, error, fetchData };
};
