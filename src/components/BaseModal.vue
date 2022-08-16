<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import BaseButton from "./BaseButton.vue";

type Variants = "center" | "right" | "top";

defineProps({
  visibleModal: {
    type: Boolean,
    default: false,
  },
  visibleContent: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String as PropType<Variants>,
    default: "center",
    validator: (value: string) => ["center", "right", "top"].includes(value),
  },
});

const showContent = ref(false);

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <transition
    name="fade-in"
    @enter="showContent = true"
    @leave="showContent = false"
  >
    <div
      class="modal-backdrop"
      :class="`modal-backdrop--${variant}`"
      v-if="visibleModal"
    >
      <transition :name="variant" @leave="close"
        ><div
          v-if="showContent && visibleContent"
          class="modal-container"
          :class="`modal-container--${variant}`"
        >
          <div class="modal-container__header">
            <slot name="header"></slot>
            <BaseButton variant="tertiary" @click="showContent = false"
              >&#x2716;</BaseButton
            >
          </div>
          <div class="modal-container__content">
            <slot name="content"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal {
  &-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;

    &--right {
      @media (min-width: 992px) {
        justify-content: flex-end;
      }
    }

    &--top {
      align-items: flex-start;
    }
  }

  &-container {
    width: 100%;
    height: 100%;
    background-color: var(--background-color-primary);
    overflow-y: auto;

    &--center {
      @media (min-width: 992px) {
        width: 80%;
        height: auto;
      }
    }

    &--right {
      @media (min-width: 992px) {
        width: 30%;
        height: 100%;
      }
    }

    &--top {
      height: 21rem;

      @media (min-width: 992px) {
        width: 100%;
      }
    }

    &__header {
      & button:hover {
        color: var(--color-primary);
      }
    }
    &__header,
    &__content {
      padding: 1rem;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.5rem;
    }

    &__content {
      display: flex;
      align-items: center;
    }
  }
}

.fade-in-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-in-leave-active {
  transition: opacity 0.8s ease-out;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.top-enter-active {
  animation: 1s top-enter;
}
.top-leave-active {
  animation: 0.5s top-leave;
}

@keyframes top-enter {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0);
  }
}

@keyframes top-leave {
  0% {
    clip-path: inset(0);
  }
  100% {
    clip-path: inset(0 0 100% 0);
  }
}

.right-enter-active {
  animation: 1s right-enter;
}
.right-leave-active {
  animation: 0.5s right-leave;
}

@keyframes right-enter {
  0% {
    clip-path: inset(0 0 0 100%);
  }
  100% {
    clip-path: inset(0);
  }
}

@keyframes right-leave {
  0% {
    clip-path: inset(0);
  }
  100% {
    clip-path: inset(0 0 0 100%);
  }
}
</style>
