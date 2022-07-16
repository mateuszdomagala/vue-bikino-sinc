<script setup lang="ts">
import TheHero from "../components/TheHero.vue";
import TheExploreMore from "../components/TheExploreMore.vue";
import TheShop from "../components/TheShop.vue";
import TheFooter from "../components/TheFooter.vue";
</script>

<template>
  <main>
    <TheHero />
    <TheExploreMore />
    <TheShop />
    <TheFooter />
  </main>
  <div class="linear-background"></div>
</template>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(11, 1fr);
  height: 100vh;
  margin-bottom: 100px;

  @media (min-width: 992px) {
    margin-bottom: 300px;
  }
}

.linear-background {
  display: none;

  @media (min-width: 992px) {
    display: block;
    min-height: calc(400vh + 900px);
    min-width: 100%;
    background: linear-gradient(90deg, #cccccc 0.5%, transparent 1%);
    background-size: 10% 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 50%;
    z-index: 2;
    animation: image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 1s backwards;
  }
}
</style>
