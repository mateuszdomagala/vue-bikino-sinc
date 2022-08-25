<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name !== "checkout") next({ name: "home" });
    else next();
  },
};
</script>

<script setup lang="ts">
import BaseLink from "../components/BaseLink.vue";

defineProps({
  orderRef: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <main>
    <section id="confirmation" class="wrapper">
      <transition name="top" appear>
        <div class="confirmation">
          <div class="confirmation__details">
            <h1>Thank you!</h1>
            <h3>Your order has been received</h3>
            <p><strong>Order Reference:</strong> {{ orderRef }}</p>
            <BaseLink variant="secondary" to="/">Back to Home</BaseLink>
          </div>
          <div class="confirmation__confetti">
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
          </div>
        </div>
      </transition>
      <div class="linear-background"></div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
}
.confirmation {
  width: 100%;
  height: 100%;

  &__details {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to right,
      var(--background-color-primary) 50%,
      var(--background-color-secondary) 50% 100%
    );

    & > * {
      z-index: 3;
    }

    & a {
      margin-top: 2rem;
    }
  }

  &__confetti {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 0;
  }
}

.confetti {
  width: 15px;
  height: 15px;
  background-color: #f2d74e;
  position: absolute;
  left: 50%;
  animation: confetti 5s ease-in-out -2s infinite;
  transform-origin: left top;

  &:nth-child(1) {
    background-color: #f2d74e;
    left: 10%;
    animation-delay: 0;
  }

  &:nth-child(2) {
    background-color: #95c3de;
    left: 20%;
    animation-delay: -5s;
  }

  &:nth-child(3) {
    background-color: #ff9a91;
    left: 30%;
    animation-delay: -3s;
  }

  &:nth-child(4) {
    background-color: #f2d74e;
    left: 40%;
    animation-delay: -2.5s;
  }

  &:nth-child(5) {
    background-color: #95c3de;
    left: 50%;
    animation-delay: -4s;
  }

  &:nth-child(6) {
    background-color: #ff9a91;
    left: 60%;
    animation-delay: -6s;
  }

  &:nth-child(7) {
    background-color: #f2d74e;
    left: 70%;
    animation-delay: -1.5s;
  }

  &:nth-child(8) {
    background-color: #95c3de;
    left: 80%;
    animation-delay: -2s;
  }

  &:nth-child(9) {
    background-color: #ff9a91;
    left: 90%;
    animation-delay: -3.5s;
  }

  &:nth-child(10) {
    background-color: #f2d74e;
    left: 100%;
    animation-delay: -2.5s;
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

.top-enter-active {
  animation: 2s top-enter;
}

@keyframes top-enter {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0);
  }
}

@keyframes confetti {
  0% {
    transform: rotateZ(15deg) rotateY(0deg) translate(0, 0);
  }
  25% {
    transform: rotateZ(5deg) rotateY(360deg) translate(-5vw, 20vh);
  }
  50% {
    transform: rotateZ(15deg) rotateY(720deg) translate(5vw, 60vh);
  }
  75% {
    transform: rotateZ(5deg) rotateY(1080deg) translate(-10vw, 80vh);
  }
  100% {
    transform: rotateZ(15deg) rotateY(1440deg) translate(10vw, 110vh);
  }
}
</style>
