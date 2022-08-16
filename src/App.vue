<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <TheHeader :cart-total-items="5" />
  <RouterView />
</template>

<style>
@import "@/assets/styles/base.css";
</style>
