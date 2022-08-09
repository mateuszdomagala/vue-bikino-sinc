<script setup lang="ts">
import { inject } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const selectedTitle = inject<string>("selectedTitle");
</script>

<template>
  <div class="tab-content" v-show="title === selectedTitle">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tab-content {
  margin: 2rem 0;
}
</style>
