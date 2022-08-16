<script setup lang="ts">
import { ref, onMounted  } from "vue";

const keyword = ref<string>("");
const input = ref<HTMLInputElement | null>(null);

const emit = defineEmits(["input"]);

const handleSubmit = () => {
  emit("input", keyword.value);
};

onMounted(() => {
  if (input.value) {
    input.value.focus();
  }
});
</script>

<template>
  <transition name="form-down" appear mode="out-in">
    <div class="form-wrapper">
      <form @submit.prevent="handleSubmit" class="search" role="search">
        <input
          class="search__input"
          v-model="keyword"
          ref="input"
          type="search"
          placeholder="You're looking for?"
          pattern="[a-zA-Z]+[a-zA-Z ]+"
          aria-label="Search through site content"
          required
        />
        <span class="search__input-highlight" :key="keyword">
          {{ keyword.replace(/ /g, "\u00a0") }}
        </span>
        <button class="search__button" type="submit">
          <img src="../assets/icons/search.svg" alt="search icon" />
        </button>
      </form>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  position: relative;
  margin: 2rem auto;

  @media (min-width: 992px) {
    width: 35%;
  }
}

.search {
  display: flex;

  &__input {
    height: 4rem;
    width: 100%;
    min-width: 100%;
    background-color: transparent;
    color: var(--text-color-primary);
    font-size: 2rem;
    border: none;
    outline: none;
    border-bottom: 3px solid var(--text-color-primary-light-2);
    padding-right: 2.5rem;

    &::placeholder {
      color: var(--text-color-primary-light-1);
    }

    &:focus {
      + .search__input-highlight {
        border-top: 3px solid var(--color-primary);
      }
    }
  }

  &__input-highlight {
    font-size: 1.8rem;
    user-select: none;
    border-top: 3px solid var(--text-color-primary-light-1);
    position: absolute;
    left: 0;
    bottom: 0;
    max-width: 100%;
    height: 0;
    color: transparent;
    overflow: hidden;
  }

  &__button {
    all: unset;
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 18%;

    & img {
      width: 30px;
      height: 30px;
      filter: invert(100%) sepia(1%) saturate(1466%) hue-rotate(63deg)
        brightness(80%) contrast(90%);

      &:hover {
        filter: invert(65%) sepia(71%) saturate(704%) hue-rotate(318deg)
          brightness(109%) contrast(101%);
      }
    }
  }
}

.form-down-enter-active {
  animation: form-down 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes form-down {
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
