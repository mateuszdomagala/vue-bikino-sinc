<template>
  <div class="carousel__slide">
    <transition name="down">
      <slot />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.carousel__slide {
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.down-enter-active {
  animation: 1s down-enter;
}
.down-leave-active {
  animation: 1s down-leave;
}

@keyframes down-enter {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0);
  }
}

@keyframes down-leave {
  0% {
    clip-path: inset(0);
  }
  100% {
    clip-path: inset(100% 0 0 0);
  }
}
</style>
