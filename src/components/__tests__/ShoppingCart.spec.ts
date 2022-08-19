import { describe, it, expect, vi, type SpyInstanceFn } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import ShoppingCart from "../ShoppingCart.vue";

vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    push: () => {
      /**/
    },
  })),
}));

describe("ShoppingCart.vue", () => {
  const cart = {
    id: "cart_9BAmwJ303VoeXd",
    created: 1660805726,
    updated: 1660893118,
    expires: 1663485118,
    total_items: 1,
    total_unique_items: 1,
    subtotal: {
      raw: 45,
      formatted: "45.00",
      formatted_with_symbol: "$45.00",
      formatted_with_code: "45.00 USD",
    },
    hosted_checkout_url: "https://checkout.chec.io/cart/cart_9BAmwJ303VoeXd",
    meta: null,
    line_items: [
      {
        id: "item_7RyWOwmK5nEa2V",
        product_id: "prod_4WJvlKqgkBobYV",
        name: "Stripped T Shirt",
        product_name: "Stripped T Shirt",
        sku: null,
        permalink: "qjMVmK",
        quantity: 1,
        price: {
          raw: 45,
          formatted: "45.00",
          formatted_with_symbol: "$45.00",
          formatted_with_code: "45.00 USD",
        },
        line_total: {
          raw: 45,
          formatted: "45.00",
          formatted_with_symbol: "$45.00",
          formatted_with_code: "45.00 USD",
        },
        is_valid: true,
        product_meta: [],
        selected_options: [
          {
            group_id: "vgrp_gnZO5kOY357MNq",
            group_name: "Size",
            option_id: "optn_zkK6oL9grV5Xn0",
            option_name: "M",
            price: {
              raw: 0,
              formatted: "0.00",
              formatted_with_symbol: "$0.00",
              formatted_with_code: "0.00 USD",
            },
          },
        ],
        variant: {
          id: "vrnt_31q0o3bVr8wDdj",
          sku: null,
          description: null,
          inventory: null,
          price: null,
          is_valid: true,
          invalid_reason_code: null,
          meta: null,
          created: 1652255382,
          updated: 1652255382,
          options: {
            vgrp_gnZO5kOY357MNq: "optn_zkK6oL9grV5Xn0",
          },
          assets: [],
        },
        image: {
          id: "ast_Kvg9l6VLXvl1bB",
          url: "https://cdn.chec.io/merchants/42877/assets/kQdC1YwhTzey6zRb|black-and-white-stripe-tee.jpg",
          description: null,
          is_image: true,
          filename: "black-and-white-stripe-tee.jpg",
          file_size: 64334,
          file_extension: "jpg",
          image_dimensions: {
            width: 1115,
            height: 744,
          },
          meta: [],
          created_at: 1652693687,
          updated_at: 1652693689,
        },
        tax: null,
      },
    ],
    currency: {
      code: "USD",
      symbol: "$",
    },
    discount: [],
  };

  it("cart prop is required and must be an object", () => {
    expect(ShoppingCart.props).toMatchObject({
      cart: {
        type: Object,
        required: true,
      },
    });
  });

  it("empties the shopping cart when the trash button is clicked", async () => {
    const wrapper = shallowMount(ShoppingCart, {
      props: {
        cart: cart,
      },
    });

    await wrapper.find('[data-testid="btn-empty"]').trigger("click");
    expect(wrapper.emitted("empty-cart")).toBeTruthy();
  });

  it("renders the correct number of items in the shopping cart", () => {
    const wrapper = shallowMount(ShoppingCart, {
      props: {
        cart: cart,
      },
    });

    expect(wrapper.findAll("shopping-cart-item-stub").length).toBe(1);
  });

  it("emits a close cart event", async () => {
    const wrapper = shallowMount(ShoppingCart, {
      props: {
        cart: cart,
      },
    });

    await wrapper.find('[data-testid="btn-checkout"]').trigger("click");
    expect(wrapper.emitted("close-cart")).toBeTruthy();
  });

  it("changes path to checkout with cart id as param when checkout button is clicked", async () => {
    const push = vi.fn();
    (useRouter as SpyInstanceFn).mockImplementationOnce(() => ({
      push,
    }));

    const wrapper = shallowMount(ShoppingCart, {
      props: {
        cart: cart,
      },
    });

    await wrapper.find('[data-testid="btn-checkout"]').trigger("click");

    expect(push).toHaveBeenCalledWith({
      name: "checkout",
      params: { cartId: cart.id },
    });
  });
});
