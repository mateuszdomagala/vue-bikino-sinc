<script setup lang="ts">
import type { PropType } from "vue";

type Variants = "primary" | "secondary" | "tertiary";

defineProps({
  variant: {
    type: String as PropType<Variants>,
    required: true,
    validator: (value: string) =>
      ["primary", "secondary", "tertiary"].includes(value),
  },
});
</script>

<template>
  <button class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  color: var(--text-color-secondary);
  background-color: var(--color-primary);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &--primary {
    font-size: 1rem;
    line-height: 1.6;
    text-align: left;
  }

  &--secondary {
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 12px 50px;

    @media (min-width: 992px) {
      padding: 12px 45px;
    }
  }

  &--primary,
  &--secondary {
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: var(--text-color-primary);
    }
  }

  &--tertiary {
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--text-color-primary);
    background-color: transparent;
    border-radius: 50%;
    padding: 10px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: var(--background-color-primary);
    }
  }
}
</style>
