<script setup lang="ts">
import type { PropType } from "vue";

type Variants = "h1" | "h2";

defineProps({
  type: {
    type: String as PropType<Variants>,
    default: "h2",
    validator: (value: string) => ["h1", "h2"].includes(value),
  },
  text: {
    type: String,
    required: true,
  },
  line: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <component :is="type" class="headline" :class="`headline--${type}`">
    <span :class="{ headline__line: line }" />{{ text }}
  </component>
</template>

<style lang="scss" scoped>
.headline {
  color: var(--text-color-primary);

  &__line {
    display: inline-block;
    vertical-align: middle;
    width: 3.5rem;
    border-top: 0.15rem solid;
    margin-right: 1rem;

    @media (min-width: 992px) {
      width: 7rem;
      margin-right: 2.5rem;
    }
  }

  &--h1 {
    font-size: 2.5rem;

    @media (min-width: 992px) {
      font-size: 7rem;
    }
  }
  &--h2 {
    font-size: 2rem;

    @media (min-width: 992px) {
      font-size: 3rem;
    }
  }
}
</style>
