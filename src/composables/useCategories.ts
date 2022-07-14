import { ref } from "vue";
import { commerce } from "@/chec/commerce";
import type { Category } from "@chec/commerce.js/types/category";
import type { Asset } from "@chec/commerce.js/types/asset";
import type { PaginationMeta } from "@chec/commerce.js/types/pagination";

export interface CategoryWithAssets extends Category {
  assets: Asset[];
}

export const useCategories = () => {
  const categories = ref<CategoryWithAssets[] | null>([]);
  const metadata = ref<PaginationMeta | null>(null);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    categories.value = null;
    metadata.value = null;
    error.value = null;

    try {
      const { data, meta } = await commerce.categories.list();
      categories.value = data as CategoryWithAssets[];
      metadata.value = meta;
    } catch (err) {
      error.value = `There is an error getting cattegories, error: ${
        (err as Error).message
      }`;
    }
  };

  fetchData();

  return { categories, metadata, error };
};
