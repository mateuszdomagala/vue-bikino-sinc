<script setup lang="ts">
import type { PropType } from "vue";

type Variants = "text" | "box";

const props = defineProps({
  type: {
    type: String as PropType<Variants>,
    default: "text",
    validator: (value: string) => ["text", "box"].includes(value),
  },
  height: {
    type: String,
    default: (props: any) => (props.type === "text" ? "1.5rem" : "10rem"),
  },
  width: {
    type: String,
    default: (props: any) => (props.type === "text" ? "10rem" : "20rem"),
  },
});
</script>

<template>
  <div class="skeleton" :class="`skeleton--${type}`">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  background-color: var(--text-color-primary-light-1);
  animation: pulse 1.5s infinite;

  &--text {
    width: v-bind("props.width");
    height: v-bind("props.height");
  }

  &--box {
    width: v-bind("props.width");
    height: v-bind("props.height");
  }
}

@keyframes pulse {
  0% {
    background-color: var(--text-color-primary-light-1);
  }
  50% {
    background-color: hsl(0, 0%, 82%);
  }
  100% {
    background-color: var(--text-color-primary-light-1);
  }
}
</style>
