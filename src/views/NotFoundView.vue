<script setup lang="ts">
import BaseLink from "../components/BaseLink.vue";
</script>

<template>
  <main>
    <section id="not-found" class="not-found">
      <img src="../assets/icons/404.svg" alt="page not found" />
      <h1>OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!</h1>
      <p>
        Sorry but the page you are looking for does not exist, have been
        removed, name changed or is temporarily unavailable
      </p>
      <BaseLink variant="secondary" to="/">Back to home</BaseLink>
    </section>
    <div class="linear-background"></div>
  </main>
</template>

<style lang="scss" scoped>
.not-found {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  img {
    width: 100%;

    @media (min-width: 992px) {
      width: 50%;
    }
  }

  a {
    margin-top: 2rem;
    z-index: 99;
  }
}

.linear-background {
  display: none;

  @media (min-width: 992px) {
    display: block;
    position: absolute;
    min-width: 100%;
    background: linear-gradient(90deg, #cccccc 0.5%, transparent 1%);
    background-size: 10% 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 50%;
    z-index: 2;
  }
}
</style>
