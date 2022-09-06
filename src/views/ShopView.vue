<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProducts } from "@/composables/useProducts";
import { useCategories } from "@/composables/useCategories";
import BaseLink from "../components/BaseLink.vue";
import BaseHeadline from "../components/BaseHeadline.vue";
import BasePagination from "../components/BasePagination.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseSkeleton from "../components/BaseSkeleton.vue";
import BaseButton from "../components/BaseButton.vue";
import ProductsList from "@/components/ProductsList.vue";
import ProductsListItemSkeleton from "../components/ProductsListItemSkeleton.vue";

const router = useRouter();
const route = useRoute();

const page = ref<number>(Number(route.query.page) || 1);
const recordsPerPage = ref<number>(6);
const isOpen = ref<boolean>(false);
const selected = ref<string>(
  route.query.sortDirection ? String(route.query.sortDirection) : "latest"
);
const category = ref<string | null>(
  route.query.category ? String(route.query.category) : null
);

const { categories } = useCategories();
const { products, metadata, error, isLoading, fetchData } = useProducts({
  limit: recordsPerPage.value,
  page: page.value,
  query: route.query.search,
  category_id: category.value,
  sortBy: selected.value === "latest" ? "created_at" : "price",
  sortDirection: selected.value === "latest" ? "asc" : selected.value,
});

const isCategoryActive = (newCategory: string) => {
  return category.value === newCategory || route.query.category === newCategory
    ? newCategory
    : "";
};

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

const onPageChange = (newPage: number) => {
  page.value = newPage;

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: page.value,
    },
  });
};

const onCategoryChange = (categoryId: string) => {
  category.value = categoryId;
  page.value = 1;
  selected.value = "latest";

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: page.value,
      category: category.value,
      sortBy: selected.value === "latest" ? "created_at" : "price",
      sortDirection: selected.value === "latest" ? "asc" : selected.value,
    },
  });

  if (isOpen.value === true) {
    isOpen.value = false;
  }
};

const onSelectChange = () => {
  page.value = 1;

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: page.value,
      sortBy: selected.value === "latest" ? "created_at" : "price",
      sortDirection: selected.value === "latest" ? "asc" : selected.value,
    },
  });
};

const clearAllFilters = () => {
  router.push({
    path: route.path,
  });

  page.value = 1;
  category.value = null;
  selected.value = "latest";
};

const isFilterActive = computed(() => {
  return router.currentRoute.value.fullPath !== router.currentRoute.value.path
    ? true
    : false;
});

watch(
  () => route.params,
  () =>
    fetchData({
      limit: recordsPerPage.value,
      page: page.value,
      query: route.query.search,
      category_id: category.value,
      sortBy: selected.value === "latest" ? "created_at" : "price",
      sortDirection: selected.value === "latest" ? "asc" : selected.value,
    })
);
</script>

<template>
  <main>
    <section id="shop">
      <BaseHeadline type="h1" text="shop" :line="true" />
      <div v-if="products?.length" class="shop__products">
        <BaseModal :visible="isOpen" @close="toggleModal">
          <template v-slot:content>
            <div class="shop__categories">
              <ul class="shop__categories-list">
                <li
                  v-for="category in categories"
                  :key="category.id"
                  class="shop__categories-list-item"
                  :class="{ active: isCategoryActive(category.id) }"
                >
                  <BaseLink @click.prevent="onCategoryChange(category.id)">
                    {{ category.name }}
                  </BaseLink>
                  <ul
                    v-if="category.children"
                    class="shop__categories-list shop__categories-list--inner"
                  >
                    <li
                      v-for="(item, index) in category.children"
                      :key="index"
                      :class="{ active: isCategoryActive(item.id) }"
                    >
                      <BaseLink @click.prevent="onCategoryChange(item.id)">{{
                        item.name
                      }}</BaseLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </template>
        </BaseModal>
        <div class="shop__sort">
          <div class="shop__sort-found">
            Products found: {{ metadata?.pagination.total }}
            <BaseButton
              v-if="isFilterActive"
              variant="secondary"
              @click="clearAllFilters"
              >Clear all filters</BaseButton
            >
          </div>
          <div class="shop__sort-filter">
            <label for="sort">Sort by:</label>
            <select v-model="selected" @change="onSelectChange" id="sort">
              <option disabled value="">Please select one</option>
              <option value="latest">Latest</option>
              <option value="asc">Price from low to high</option>
              <option value="desc">Price from high to low</option>
            </select>
          </div>
          <BaseButton
            variant="secondary"
            @click="toggleModal"
            class="shop__sort--mobile"
            >Categories</BaseButton
          >
          <BaseButton
            v-if="isFilterActive"
            variant="secondary"
            @click="clearAllFilters"
            class="shop__sort--mobile"
            >Clear all filters</BaseButton
          >
        </div>
        <ProductsList :products="products" />
        <BasePagination
          v-if="metadata"
          :total-pages="metadata.pagination.total_pages"
          :per-page="metadata.pagination.per_page"
          :current-page="page"
          @pagechanged="onPageChange"
        />
      </div>
      <div v-else-if="isLoading" class="shop__products">
        <div class="shop__sort">
          <BaseSkeleton /><BaseSkeleton /><BaseSkeleton
            class="skeleton--mobile"
            width="auto"
            height="2rem"
          />
        </div>
        <div class="shop__products-skeleton">
          <ProductsListItemSkeleton
            v-for="(item, index) in recordsPerPage"
            :key="index"
          />
        </div>
      </div>
      <div v-else-if="error" class="shop__products">{{ error }}</div>
      <div v-else class="shop__products shop__products--empty">
        <img
          src="../assets/icons/empty_product.svg"
          alt="No products were found image"
        />
        No products were found matching your selection
        <BaseButton
          v-if="isFilterActive"
          variant="secondary"
          @click="clearAllFilters"
          >Clear all filters</BaseButton
        >
      </div>
      <div class="shop__categories shop__categories--desktop">
        <ul class="shop__categories-list">
          <li
            v-for="category in categories"
            :key="category.id"
            class="shop__categories-list-item"
            :class="{ active: isCategoryActive(category.id) }"
          >
            <BaseLink @click.prevent="onCategoryChange(category.id)">
              {{ category.name }}
            </BaseLink>
            <ul
              v-if="category.children"
              class="shop__categories-list shop__categories-list--inner"
            >
              <li
                v-for="(item, index) in category.children"
                :key="index"
                :class="{ active: isCategoryActive(item.id) }"
              >
                <BaseLink @click.prevent="onCategoryChange(item.id)">{{
                  item.name
                }}</BaseLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <div class="linear-background"></div>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
}

section {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(11, 1fr);
  height: 150vh;
}

.shop {
  &__products {
    grid-area: 3 / 2 / 12 / 10;

    @media (min-width: 992px) {
      grid-area: 3 / 2 / 12 / 8;
      margin-top: 0;
      z-index: 3;
    }

    &--empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 5rem;
      gap: 1rem;

      & img {
        width: 15rem;

        @media (min-width: 992px) {
          width: 26rem;
        }
      }
    }
  }

  &__sort {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;

    @media (min-width: 992px) {
      flex-direction: row;
      padding: 3rem 0;
    }

    &-found {
      display: flex;
      gap: 1rem;
      align-items: center;

      & button {
        display: none;

        @media (min-width: 992px) {
          display: block;
        }
      }
    }

    & select {
      border-color: var(--text-color-primary-light-1);
      padding: 0.5rem;
      margin-left: 0.5rem;
      font-size: 1rem;
    }

    &--mobile {
      @media (min-width: 992px) {
        display: none;
      }
    }
  }

  &__categories {
    grid-area: 5 / 2 / 12 / 10;
    z-index: 3;

    @media (min-width: 992px) {
      grid-area: 4 / 8 / 12 / 10;
      justify-self: center;
    }

    &-list {
      list-style: none;
      font-size: 2.5rem;
      text-transform: lowercase;

      @media (min-width: 992px) {
        grid-area: 7 / 8 / 12 / 10;
        justify-self: center;
      }

      &--inner {
        font-size: 1rem;
        text-transform: capitalize;
        margin-left: 2rem;
      }
    }

    &--desktop {
      display: none;

      @media (min-width: 992px) {
        display: block;
      }
    }
  }

  &__products-skeleton {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 5rem 3rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1440px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.headline {
  grid-area: 2 / 2 / 3 / 11;
  align-self: center;
  animation: fade-in 2s;

  @media (min-width: 992px) {
    grid-area: 1 / 2 / 4 / 11;
    font-size: 7rem;
  }

  @media (min-width: 992px) and (max-width: 1400px) and (-webkit-min-device-pixel-ratio: 1.25) {
    grid-area: 1 / 2 / 4 / 11;
    font-size: 5rem;
  }
}

.pagination {
  padding: 3rem 0;
}

.active {
  font-weight: 700;
  text-decoration: line-through;
}

.skeleton--mobile {
  @media (min-width: 992px) {
    display: none;
  }
}

.linear-background {
  display: none;

  @media (min-width: 992px) {
    display: block;
    position: absolute;
    min-width: 100%;
    background: linear-gradient(90deg, #cccccc 0.5%, transparent 1%);
    background-size: 10% 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 50%;
    z-index: 2;
    animation: image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 1s backwards;
  }
}
</style>
