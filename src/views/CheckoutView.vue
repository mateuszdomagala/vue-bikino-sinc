<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    if (!to.params.cartId) next({ name: "home" });
    else next();
  },
};
</script>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useCheckout } from "@/composables/useCheckout";
import type { Cart } from "@chec/commerce.js/types/cart";
import BaseHeadline from "../components/BaseHeadline.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseSkeleton from "../components/BaseSkeleton.vue";

const cart = ref<Cart | undefined>(inject("cart"));
const refreshCart = inject<(() => Promise<Cart>) | undefined>("refreshCart");
const router = useRouter();
const isOrderLoading = ref(false);

if (!cart.value) {
  throw new Error("There was an error injecting the cart");
}

const { checkoutToken, captureCheckout, order, error } = useCheckout(
  cart.value.id
);

const checkoutForm = ref({
  customer: {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
  },
  shipping: {
    name: "John Doe",
    street: "123 Fake St",
    town_city: "San Francisco",
    county_state: "CA",
    postal_zip_code: "94103",
    country: "US",
  },
  fulfillment: {
    shipping_method: "",
  },
  payment: {
    gateway: "test_gateway",
    card: {
      number: "4242 4242 4242 4242",
      expiry_month: "01",
      expiry_year: "2023",
      cvc: "123",
      postal_zip_code: "94103",
    },
  },
});

const handleCapture = async () => {
  isOrderLoading.value = true;

  const orderData = {
    line_items: cart?.value?.line_items,
    customer: checkoutForm.value.customer,
    shipping: checkoutForm.value.shipping,
    fulfillment: checkoutForm.value.fulfillment,
    payment: checkoutForm.value.payment,
  };

  if (!checkoutToken.value) {
    throw new Error("There was an error with checkout token");
  }

  await captureCheckout(checkoutToken.value.id, orderData);
  await refreshCart?.();

  router.push({
    name: "confirmation",
    params: {
      orderRef: order.value?.customer_reference,
    },
  });
};
</script>

<template>
  <main>
    <section id="checkout">
      <BaseHeadline type="h1" text="checkout" :line="true" />
      <div class="checkout__form-wrapper">
        <form class="checkout__form" @submit.prevent="handleCapture">
          <fieldset class="checkout__form-fieldset">
            <legend>Customer information</legend>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                v-model="checkoutForm.customer.firstname"
                name="firstName"
                required
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="firstName"
                >First name</label
              >
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                v-model="checkoutForm.customer.lastname"
                name="lastName"
                required
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="lastName">Last name</label>
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="email"
                v-model="checkoutForm.customer.email"
                name="email"
                required
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="email">Email</label>
            </div>
          </fieldset>

          <fieldset class="checkout__form-fieldset">
            <legend>Shipping details</legend>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                v-model="checkoutForm.shipping.name"
                name="name"
                required
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="fullname">Full name</label>
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                v-model="checkoutForm.shipping.street"
                name="street"
                required
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="street"
                >Street address</label
              >
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                v-model="checkoutForm.shipping.town_city"
                name="city"
                required
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="city">City</label>
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                v-model="checkoutForm.shipping.postal_zip_code"
                name="postalZipCode"
                required
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="postalZipCode"
                >Postal/Zip code</label
              >
            </div>

            <div class="select-group">
              <select
                v-model="checkoutForm.shipping.country"
                name="country"
                class="select-group__select"
                required
              >
                <option value="" disabled>Country</option>
                <option
                  v-for="(country, index) in checkoutToken?.live?.shipping
                    .available_options[0].countries"
                  :value="country"
                  :key="index"
                >
                  {{ country }}
                </option>
              </select>
              <span class="select-group__bar"></span>
              <label class="select-group__label" for="country">Country</label>
            </div>

            <div class="select-group">
              <select
                v-model="checkoutForm.shipping.county_state"
                name="stateProvince"
                class="select-group__select"
                required
              >
                <option value="" disabled>State/province</option>
                <option
                  v-for="(subdivision, index) in checkoutToken?.live?.shipping
                    .available_options[0].regions.US"
                  :value="subdivision"
                  :key="index"
                >
                  {{ subdivision }}
                </option>
              </select>
              <span class="select-group__bar"></span>
              <label class="select-group__label" for="stateProvince"
                >State/province</label
              >
            </div>

            <div class="select-group">
              <select
                v-model="checkoutForm.fulfillment.shipping_method"
                name="shippingOption"
                class="select-group__select"
                required
              >
                <option value="" disabled>Select a shipping method</option>
                <option
                  v-for="(method, index) in checkoutToken?.live?.shipping
                    .available_options"
                  :value="method.id"
                  :key="index"
                >
                  {{
                    `${method.description} - $${method.price.formatted_with_code}`
                  }}
                </option>
              </select>
              <span class="select-group__bar"></span>
              <label class="select-group__label" for="shippingOption"
                >Shipping method</label
              >
            </div>
          </fieldset>

          <fieldset class="checkout__form-fieldset">
            <legend>Payment information</legend>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                name="cardNum"
                v-model="checkoutForm.payment.card.number"
                readonly
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="cardNum"
                >Credit card number</label
              >
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                name="expMonth"
                v-model="checkoutForm.payment.card.expiry_month"
                readonly
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="expMonth"
                >Expiry month</label
              >
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                name="expYear"
                v-model="checkoutForm.payment.card.expiry_year"
                readonly
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="expYear"
                >Expiry year</label
              >
            </div>

            <div class="input-group">
              <input
                class="input-group__input"
                type="text"
                name="ccv"
                v-model="checkoutForm.payment.card.cvc"
                readonly
              />
              <span class="input-group__bar"></span>
              <label class="input-group__label" for="ccv">CCV</label>
            </div>
          </fieldset>
          <BaseButton variant="secondary">
            <p v-if="!isOrderLoading">Confirm order</p>
            <p v-else class="loading">
              Processing order<span>.</span><span>.</span><span>.</span>
            </p>
          </BaseButton>
        </form>
        <div v-if="error">{{ error }}</div>
      </div>
      <div class="checkout__summary" v-if="checkoutToken !== null">
        <div class="checkout__summary-wrapper">
          <h3>Order summary</h3>
          <div
            v-for="item in cart?.line_items"
            :key="item.id"
            class="checkout__summary-product"
          >
            <img
              :src="item.image?.url"
              :alt="item.product_name"
              class="checkout__summary-image"
              loading="lazy"
            />
            <p class="checkout__summary-name">
              {{ item.quantity }} x {{ item.name }} ({{
                item.selected_options[0].option_name
              }})
            </p>
            <p class="checkout__summary-value">
              {{ item.line_total.formatted_with_symbol }}
            </p>
          </div>
          <div class="checkout__summary-total">
            <p class="checkout__summary-subtotal">Subtotal:</p>
            <p class="checkout__summary-price">
              {{ cart?.subtotal.formatted_with_symbol }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="checkout__summary">
        <div
          class="checkout__summary-wrapper checkout__summary-wrapper--skeleton"
        >
          <BaseSkeleton></BaseSkeleton>
          <div class="checkout__summary-product">
            <BaseSkeleton
              height="4rem"
              width="4rem"
              class="checkout__summary-image"
            ></BaseSkeleton>
            <BaseSkeleton width="15rem"></BaseSkeleton>
            <BaseSkeleton
              width="4rem"
              class="checkout__summary-value"
            ></BaseSkeleton>
          </div>
          <div class="checkout__summary-total">
            <BaseSkeleton></BaseSkeleton>
            <BaseSkeleton
              width="4rem"
              class="checkout__summary-price"
            ></BaseSkeleton>
          </div>
        </div>
      </div>
    </section>
    <div class="linear-background"></div>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
}

section {
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  @media (min-width: 992px) {
    grid-template-rows: repeat(11, 1fr);
    min-height: 130vh;

    background: linear-gradient(
      to right,
      var(--background-color-secondary) 50%,
      var(--background-color-primary) 50% 100%
    );
  }
}

.checkout {
  &__form-wrapper {
    grid-area: 5 / 2 / 12 / 10;

    @media (min-width: 992px) {
      grid-area: 3 / 2 / 12 / 6;
      z-index: 3;
    }
  }

  &__summary {
    grid-area: 2 / 2 / 5 / 10;
    margin-bottom: 2rem;
    margin-top: 15rem;

    @media (min-width: 992px) {
      grid-area: 3 / 7 / 12 / 10;
      z-index: 3;
      margin-top: 0;
    }

    &-wrapper {
      padding: 1rem;
      border: 2px solid var(--color-primary);

      &--skeleton {
        border-color: var(--text-color-primary-light-1);
      }
    }

    &-product {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }

    &-image {
      display: none;

      @media (min-width: 768px) {
        display: block;
        width: 4rem;
        height: 4rem;
        object-fit: cover;
      }
    }

    &-value {
      margin-left: auto;
    }

    &-total {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
    }
  }

  &__form-fieldset {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
    border: unset;

    &:not(:first-child) {
      margin-top: 4rem;
    }
  }

  &__form-fieldset legend {
    margin-bottom: 3rem;
    font-size: 1.3rem;
    font-weight: 700;
  }

  &__form button {
    margin: 2rem 0;

    @media (min-width: 992px) and (max-width: 1400px) and (-webkit-min-device-pixel-ratio: 1.25) {
      margin: 4rem 0;
    }
  }
}

.headline {
  grid-area: 2 / 2 / 3 / 11;
  align-self: center;
  animation: fade-in 2s;
  margin-top: 9rem;

  @media (min-width: 992px) {
    grid-area: 1 / 2 / 4 / 11;
    font-size: 7rem;
    margin-top: 0;
  }

  @media (min-width: 992px) and (max-width: 1400px) and (-webkit-min-device-pixel-ratio: 1.25) {
    grid-area: 1 / 2 / 4 / 11;
    font-size: 5rem;
  }
}

.input-group__input,
.select-group__select {
  font-size: 1.1rem;
  padding: 10px 10px 10px 5px;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--text-color-primary-light-1);
  background: rgba(0, 0, 0, 0.02);

  @media (min-width: 1627px) {
    width: 290px;
  }

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:read-only ~ label,
  &:valid ~ label {
    top: -20px;
    font-size: 0.9rem;
    color: var(--color-primary);
  }

  &:focus ~ .input-group__bar:before,
  &:focus ~ .select-group__bar:before,
  &:focus ~ .input-group__bar:after,
  &:focus ~ .select-group__bar:after {
    width: 50%;
  }
}

.input-group,
.select-group {
  position: relative;
  width: 100%;
  padding-right: 1rem;

  @media (min-width: 1627px) {
    width: auto;
  }

  &__label {
    color: var(--text-color-primary-light-1);
    font-size: 1.1rem;
    pointer-events: none;
    position: absolute;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  &__bar {
    position: relative;
    display: block;
    width: 100%;

    @media (min-width: 1627px) {
      width: 290px;
    }

    &:before,
    &:after {
      content: "";
      height: 2px;
      width: 0;
      bottom: 0px;
      position: absolute;
      background: var(--color-primary);
      transition: 0.2s ease all;
    }

    &:before {
      left: 50%;
    }

    &:after {
      right: 50%;
    }
  }
}

.input-group__input:read-only {
  background: rgba(0, 0, 0, 0.06);
  color: var(--text-color-primary-light-1);
}

.loading span {
  animation-name: blinkdot;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;

  & span:nth-child(2) {
    animation-delay: 0.2s;
  }

  & span:nth-child(3) {
    animation-delay: 0.4s;
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
    animation: image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 1s backwards;
  }
}

@keyframes blinkdot {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
