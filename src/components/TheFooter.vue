<script setup lang="ts">
import { ref } from "vue";
import BaseHeadline from "./BaseHeadline.vue";
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";

const stores = [
  {
    name: "Forum Des Halles",
    address: {
      street: "101 Porte Berger",
      city: "75001 Paris",
      country: "France",
      position: {
        lat: 48.86189925192305,
        lng: 2.346874832472994,
      },
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
      position: {
        lat: 40.73466105399263,
        lng: -73.87044357727068,
      },
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
      position: {
        lat: 49.32540470687373,
        lng: -123.14077777115057,
      },
    },
    email: "vancity@bikinosinc.com",
    phone: "+1 708-330-1120",
  },
];

const isModalOpen = ref<boolean>(false);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
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
      <BaseButton variant="primary" @click="toggleModal"
        >View<br />Map</BaseButton
      >
    </div>
    <BaseModal :visible-modal="isModalOpen" @close="toggleModal">
      <template v-slot:header>Stores</template>
      <template v-slot:content>
        <GMapMap
          :center="{ lat: 45.86189925192305, lng: -60.346874832472994 }"
          :zoom="3.9"
        >
          <GMapMarker
            v-for="(store, index) in stores"
            :position="store.address.position"
            :key="index"
          />
        </GMapMap>
      </template>
    </BaseModal>
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

.vue-map-container {
  width: 100%;
  height: 60vh;
}
</style>
