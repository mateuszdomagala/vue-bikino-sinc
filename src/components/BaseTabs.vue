<script setup lang="ts">
import { ref, useSlots, provide } from "vue";

const slots = useSlots();
const tabTitles = ref<string[]>([]);

if (slots.default)
  tabTitles.value =
    slots.default && slots.default().map((tab) => tab.props?.title);

const selectedTitle = ref<string>(tabTitles.value[0]);

provide("selectedTitle", selectedTitle);
</script>

<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        v-for="(title, index) in tabTitles"
        :key="index"
        :class="{ active: title === selectedTitle }"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  &__header {
    display: flex;
    list-style: none;

    & li {
      cursor: pointer;
      margin-right: 2rem;

      @media (min-width: 992px) {
        margin-right: 3.4rem;
      }

      &.active {
        border-bottom: 2px solid var(--text-color-primary);
      }
    }
  }
}
</style>
