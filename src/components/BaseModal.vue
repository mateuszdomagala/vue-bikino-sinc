<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <transition name="fade-in">
    <div
      class="modal-backdrop"
      v-if="visible"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <div class="modal-container">
        <div class="modal-container__header">
          <slot name="header"></slot>
          <BaseButton variant="tertiary" @click="close">&#x2716;</BaseButton>
        </div>
        <div class="modal-container__content">
          <slot name="content"></slot>
        </div>
      </div>
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
  }

  &-container {
    width: 100%;
    height: 100%;
    background-color: var(--background-color-primary);

    @media (min-width: 992px) {
      width: 80%;
      height: auto;
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
      justify-content: center;
      align-items: center;
    }
  }
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
</style>
