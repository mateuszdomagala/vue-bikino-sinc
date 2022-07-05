<script setup lang="ts">
import { computed } from "@vue/reactivity";
import type { PropType } from "vue";

type Variants = "primary" | "secondary" | "tertiary";

const props = defineProps({
  to: {
    type: [String, Object],
  },
  href: {
    type: String,
  },
  variant: {
    type: String as PropType<Variants>,
    default: "tertiary",
    validator: (value: string) =>
      ["primary", "secondary", "tertiary"].includes(value),
  },
});

const linkTag = computed(() => {
  return props.to && !props.href ? "router-link" : "a";
});

const linkProps = computed(() => {
  if (props.to && !props.href) {
    return { to: props.to };
  }
  return { href: props.href };
});
</script>

<template>
  <component
    :is="linkTag"
    v-bind="linkProps"
    class="link"
    :class="`link--${variant}`"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  text-decoration: none;

  &--primary,
  &--secondary {
    color: var(--text-color-secondary);
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: inset 300px 0 0 0 var(--text-color-primary);
    }
  }

  &--primary {
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

  &--tertiary {
    color: var(--text-color-primary);

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
