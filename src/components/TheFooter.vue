<script setup lang="ts">
import BaseHeadline from "./BaseHeadline.vue";
import BaseButton from "./BaseButton.vue";

const stores = [
  {
    name: "Forum Des Halles",
    address: {
      street: "101 Porte Berger",
      city: "75001 Paris",
      country: "France",
    },
    email: "paris@bikinosinc.com",
    phone: "+33 569 043 0236",
  },
  {
    name: "Queens Center",
    address: {
      street: "9015 Queens Bivd",
      city: "Eimhurst",
      country: "NY 11373-4900",
    },
    email: "ny@bikinosinc.com",
    phone: "+1 718-522-5200",
  },
  {
    name: "Park Royal",
    address: {
      street: "2002 Park Royal S",
      city: "West Vancouver",
      country: "BC V7T 2W4",
    },
    email: "vancity@bikinosinc.com",
    phone: "+1 708-330-1120",
  },
];
</script>

<template>
  <footer id="store-locations">
    <div class="store-locations__headline">
      <BaseHeadline type="h2" text="stores" :line="true" />
    </div>
    <div class="store-locations__stores">
      <div
        v-for="(store, index) in stores"
        :key="index"
        class="store-locations__stores-item"
      >
        <p>{{ store.name }}</p>
        <p>{{ store.address.street }}</p>
        <p>{{ store.address.city }}</p>
        <p>{{ store.address.country }}</p>
        <p>
          E. <a :href="`mailto:${store.email}`">{{ store.email }}</a>
        </p>
        <p>T. {{ store.phone }}</p>
      </div>
    </div>
    <div class="store-locations__image">
      <img src="../assets/images/stores.jpg" alt="store locations background" />
    </div>
    <div class="store-locations__map">
      <BaseButton variant="primary">View<br />Map</BaseButton>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(11, 1fr);
  height: 100vh;
}
.store-locations {
  &__headline {
    grid-area: 1 / 2 / 2 / 10;
    background-color: var(--background-color-primary);
    z-index: 1;

    @media (min-width: 992px) {
      grid-area: 1 / 2 / 2 / 7;
    }

    @media (min-width: 992px) and (max-width: 1279px) {
      grid-area: 1 / 2 / 2 / 10;
    }
  }

  &__stores {
    grid-area: 3 / 2 / 10 / 10;
    z-index: 1;
    background-color: var(--background-color-primary);
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;

    @media (min-width: 992px) {
      grid-area: 2 / 2 / 6 / 7;
      align-items: center;
      gap: 0;
    }

    @media (min-width: 992px) and (max-width: 1279px) {
      grid-area: 2 / 2 / 6 / 10;
    }

    @media (min-width: 1280px) {
      justify-content: space-around;
    }

    &-item {
      & p:nth-child(1) {
        text-transform: uppercase;
        margin-bottom: 10px;

        @media (min-width: 992px) {
          margin-bottom: 20px;
        }
      }

      & p:nth-child(4) {
        margin-bottom: 10px;

        @media (min-width: 992px) {
          margin-bottom: 20px;
        }
      }

      & a {
        text-decoration: none;
        color: var(--color-primary);
      }
    }
  }

  &__image {
    display: none;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: bottom;
    }

    @media (min-width: 992px) {
      display: block;
      grid-area: 1 / 6 / 12 / 10;
    }
  }

  &__map {
    display: none;

    @media (min-width: 992px) {
      grid-area: 6 / 1 / 12 / 6;
      background-color: var(--background-color-secondary);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }
  }
}

.btn {
  display: none;

  @media (min-width: 992px) {
    display: flex;
    grid-area: 3 / 2 / 3 / 2;
    z-index: 3;
  }
}
</style>
