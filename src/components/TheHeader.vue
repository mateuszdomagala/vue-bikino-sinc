<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseSearch from "./BaseSearch.vue";
import BaseLink from "./BaseLink.vue";

defineProps({
  cartTotalItems: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["shopping-cart"]);

const isModalOpen = ref<boolean>(false);
const isContentVisible = ref<boolean>(false);
const isMenuOpen = ref<boolean>(false);

const router = useRouter();
const route = useRoute();
const currentRoute = router.currentRoute.value.name;

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
  isContentVisible.value = true;
};

const toggleModalContent = () => {
  isContentVisible.value = !isContentVisible.value;
};

const addScroll = () => {
  document.body.classList.add("hide-scrollbar");
};

const removeScroll = () => {
  document.body.classList.remove("hide-scrollbar");
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  isMenuOpen.value ? addScroll() : removeScroll();
};

const handleSearch = (searchKeyword: string) => {
  if (currentRoute === "shop") {
    router.push({
      path: route.path,
      query: { ...route.query, page: 1, search: searchKeyword },
    });
  } else {
    router.push({
      path: "shop",
      query: { ...route.query, page: 1, search: searchKeyword },
    });
  }
  toggleModalContent();
};

const openShoppingCart = () => {
  emit("shopping-cart");
};
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <BaseLink class="logo" to="/">bikino.</BaseLink>
      <BaseLink
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        ><img src="../assets/icons/facebook.svg" alt="facebook icon"
      /></BaseLink>
      <BaseLink
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        ><img src="../assets/icons/twitter.svg" alt="twitter icon"
      /></BaseLink>
    </div>
    <div class="header__search">
      <BaseButton variant="tertiary" @click="toggleModal"
        ><img src="../assets/icons/search.svg" alt="search icon"
      /></BaseButton>
    </div>
    <transition name="wobble" mode="out-in">
      <div class="header__cart" :key="cartTotalItems">
        <BaseButton variant="tertiary" @click="openShoppingCart">
          <img src="../assets/icons/shopping-bag.svg" alt="shopping bag icon" />
          <div class="circle">
            <p>{{ cartTotalItems }}</p>
          </div>
        </BaseButton>
      </div>
    </transition>
    <div class="header__menu">
      <div
        class="menu-icon"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
      >
        <span class="menu-icon__line menu-icon__line-left"></span>
        <span class="menu-icon__line"></span>
        <span class="menu-icon__line menu-icon__line-right"></span>
      </div>
    </div>
    <transition name="top" :duration="{ enter: 1500, leave: 750 }">
      <div v-if="isMenuOpen" class="menu__wrapper">
        <div class="inner">
          <ul class="menu__list" @click="toggleMenu">
            <li class="menu__item">
              <BaseLink to="/">
                <span class="menu__item-name">home</span>
              </BaseLink>
            </li>
            <li class="menu__item">
              <BaseLink to="/shop">
                <span class="menu__item-name">shop</span>
              </BaseLink>
            </li>
            <li class="menu__item">
              <BaseLink to="/categories">
                <span class="menu__item-name">categories</span>
              </BaseLink>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <BaseModal
      variant="top"
      :visible-modal="isModalOpen"
      :visible-content="isContentVisible"
      @close="toggleModal"
    >
      <template v-slot:header>Search</template>
      <template v-slot:content>
        <BaseSearch @input="handleSearch" />
      </template>
    </BaseModal>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: 8rem;
  min-width: 100%;
  position: fixed;
  z-index: 99;
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  & img {
    width: 1.1rem;
    height: 1.1rem;
  }

  &__logo {
    grid-column: 2 / 3;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & img {
      transition: filter 0.3s ease-in-out;

      &:hover {
        filter: invert(65%) sepia(71%) saturate(704%) hue-rotate(318deg)
          brightness(109%) contrast(101%);
      }
    }

    & .logo {
      align-self: end;
      font-size: 2rem;
      font-family: "Ubuntu", sans-serif;
      font-weight: 700;
      transform: rotate(270deg);
      margin-left: -35px;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__search {
    grid-column: 5 / 6;
    display: flex;
    align-items: center;

    & button {
      padding: 0;

      &:hover {
        background: unset;
      }
    }

    & img {
      transition: filter 0.3s ease-in-out;

      &:hover {
        filter: invert(65%) sepia(71%) saturate(704%) hue-rotate(318deg)
          brightness(109%) contrast(101%);
      }
    }
  }

  &__cart {
    margin-right: 0.6rem;
    grid-column: 8 / 9;
    display: flex;
    justify-self: flex-end;
    align-self: center;
    position: relative;
    cursor: pointer;

    & img {
      width: 1.5rem;
      height: 1.5rem;
      transition: filter 0.3s ease-in-out;
    }

    & .circle {
      background-color: var(--color-primary);
      border-radius: 50%;
      width: 1.2rem;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--color-secondary);
      position: absolute;
      top: 50%;
      left: 50%;
      transition: background-color 0.3s ease-in-out;

      & > * {
        animation: fade-in 1s;
      }
    }

    & button:hover {
      background: unset;
    }

    &:hover img {
      filter: invert(65%) sepia(71%) saturate(704%) hue-rotate(318deg)
        brightness(109%) contrast(101%);
    }

    &:hover .circle {
      background-color: var(--text-color-primary);
    }
  }

  &__menu {
    grid-column: 9 / 10;
    display: flex;
    justify-self: flex-end;
    align-self: center;
  }
}

.menu-icon {
  $size: 1.87rem;
  margin-top: 1rem;
  height: $size;
  width: $size;
  z-index: 2;
  cursor: pointer;

  &__line {
    height: 2px;
    width: $size;
    display: block;
    background-color: var(--text-color-primary);
    margin-bottom: 4px;
    transition: transform 0.2s ease, background-color 0.5s ease;
  }
  &__line-left {
    width: $size / 2;
  }
  &__line-right {
    width: $size / 2;
    float: right;
  }

  &:hover > * {
    background-color: var(--color-primary);
  }
}

.active {
  & .menu-icon {
    &__line {
      transform: translateX(0px) rotate(-45deg);
    }
    &__line-left {
      transform: translateX(1px) rotate(45deg);
    }
    &__line-right {
      transform: translateX(-2px) rotate(45deg);
    }
  }
}

.menu {
  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-primary);

    & .inner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      display: flex;
      align-items: center;
    }
  }

  &__item {
    font-size: 3rem;
    color: var(--text-color-primary);
    margin: 0 0 1em;
    position: relative;
    display: block;
    outline: none;
    line-height: 1;

    @media (min-width: 992px) {
      font-size: 4rem;
    }
  }

  &__item-name {
    position: relative;
    display: inline-block;
    padding: 0 0.35em;
    font-weight: 700;
    line-height: 1.4;
    transition: color 0.5s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    margin-left: 1rem;
    animation: text-down 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

    @media (min-width: 992px) {
      margin-left: 10rem;
    }

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 50%;
      left: 0;
      bottom: 0;
      opacity: 0.3;
      transform: scale3d(0, 1, 1);
      transform-origin: 0% 50%;
      transition: transform 0.5s;
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }
  }
}

.menu__item .menu__item-name::before,
.menu__item .menu__item-label::before {
  background: var(--color-primary);
}

.menu__item:hover .menu__item-name::before,
.menu__item:focus .menu__item-name::before,
.menu__item:hover,
.menu__item:focus {
  transform: scale3d(1, 1, 1);
}

.top-enter-active {
  animation: 0.6s top-enter;
}
.top-leave-active {
  animation: 0.8s top-leave;
}
.top-enter-active .inner {
  animation: 1.5s top-enter;
}
.top-leave-active .inner {
  animation: 0.65s top-leave;
}

.wobble-enter-active {
  animation: wobble-horizontal-bottom 0.8s linear both;
}

@keyframes wobble-horizontal-bottom {
  0%,
  100% {
    transform: translateX(0);
    transform-origin: 50% 50%;
  }
  15% {
    transform: translateX(-16px) rotate(-6deg);
  }
  30% {
    transform: translateX(8px) rotate(6deg);
  }
  45% {
    transform: translateX(-8px) rotate(-3.6deg);
  }
  60% {
    transform: translateX(6px) rotate(2.4deg);
  }
  75% {
    transform: translateX(-2px) rotate(-1.2deg);
  }
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

@keyframes text-down {
  0% {
    transform: translateY(-50px);
    transform-origin: 50% 50%;
  }
  100% {
    transform: translateY(0);
    transform-origin: 50% 50%;
  }
}
</style>
