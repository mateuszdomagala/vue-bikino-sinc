<script setup lang="ts">
import type { PropType } from "vue";

type Numbers = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09";

defineProps({
  number: {
    type: String as PropType<Numbers>,
    default: "01",
    validator: (value: string) =>
      ["01", "02", "03", "04", "05", "06", "07", "08", "09"].includes(value),
  },
});
</script>

<template>
  <div class="number">{{ number }}</div>
</template>

<style lang="scss" scoped>
.number {
  font-size: 4.7rem;
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  display: inline;
  position: relative;
  color: var(--color-primary);

  @media (min-width: 992px) {
    font-size: 2rem;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2.6rem;
    width: 1.4rem;
    background-color: var(--background-color-primary);

    @media (min-width: 992px) {
      height: 1.1rem;
      width: 0.6rem;
    }
  }
}
</style>
