<script setup lang="ts">
import { computed } from "@vue/reactivity";
import BaseLink from "./BaseLink.vue";

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["pagechanged"]);

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isInLastPage = computed(() => {
  if (props.totalPages === 0) {
    return true;
  }
  return props.currentPage === props.totalPages;
});

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }
  if (props.totalPages < props.maxVisibleButtons) {
    return 1;
  }
  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons + 1;
  }
  return props.currentPage - 1;
});

const endPage = computed(() => {
  if (props.totalPages === 0) {
    return 1;
  }
  if (props.totalPages < props.maxVisibleButtons) {
    return props.totalPages;
  }
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    props.totalPages
  );
});

const pages = computed(() => {
  const range = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    });
  }
  return range;
});

const onClickFirstPage = () => {
  if (isInFirstPage.value) {
    return false;
  }
  emit("pagechanged", 1);
};

const onClickPreviousPage = () => {
  if (isInFirstPage.value) {
    return false;
  }
  emit("pagechanged", props.currentPage - 1);
};

const onClickPage = (page: number) => {
  emit("pagechanged", page);
};

const onClickNextPage = () => {
  if (isInLastPage.value) {
    return false;
  }
  emit("pagechanged", props.currentPage + 1);
};

const onClickLastPage = () => {
  if (isInLastPage.value) {
    return false;
  }
  emit("pagechanged", props.totalPages);
};

const isPageActive = (page: number) => {
  return props.currentPage === page;
};
</script>

<template>
  <ul class="pagination">
    <li class="pagination-item">
      <BaseLink
        href="#"
        @click.prevent="onClickFirstPage"
        :class="isInFirstPage ? 'disabled' : ''"
        :disabled="isInFirstPage"
        data-testid="first"
        >First</BaseLink
      >
    </li>
    <li class="pagination-item">
      <BaseLink
        href="#"
        @click.prevent="onClickPreviousPage"
        :class="isInFirstPage ? 'disabled' : ''"
        :disabled="isInFirstPage"
        data-testid="previous"
        >«</BaseLink
      >
    </li>
    <li v-for="(page, index) in pages" :key="index" class="pagination-item">
      <BaseLink
        href="#"
        @click.prevent="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        data-testid="page"
        >{{ page.name }}</BaseLink
      >
    </li>
    <li class="pagination-item">
      <BaseLink
        href="#"
        @click.prevent="onClickNextPage"
        :class="isInLastPage ? 'disabled' : ''"
        :disabled="isInLastPage"
        data-testid="next"
        >»</BaseLink
      >
    </li>
    <li class="pagination-item">
      <BaseLink
        href="#"
        @click.prevent="onClickLastPage"
        :class="isInLastPage ? 'disabled' : ''"
        :disabled="isInLastPage"
        data-testid="last"
        >Last</BaseLink
      >
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pagination {
  list-style: none;
  font-size: 1.1rem;

  & li {
    display: inline-block;
    margin-right: 2rem;
  }
}

.active {
  font-weight: 700;
  color: var(--color-primary);
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
