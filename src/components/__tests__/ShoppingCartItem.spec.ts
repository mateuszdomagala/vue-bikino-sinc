import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ShoppingCartItem from "../ShoppingCartItem.vue";

describe("ShoppingCartItem.vue", () => {
  const item = {
    id: "item_7RyWOwmK5nEa2V",
    product_id: "prod_4WJvlKqgkBobYV",
    name: "Stripped T Shirt",
    product_name: "Stripped T Shirt",
    sku: null,
    permalink: "qjMVmK",
    quantity: 2,
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
        option_id: "optn_DWy4oG4g6M56Jx",
        option_name: "L",
        price: {
          raw: 0,
          formatted: "0.00",
          formatted_with_symbol: "$0.00",
          formatted_with_code: "0.00 USD",
        },
      },
    ],
    variant: {
      id: "vrnt_p6dP5gG89R5n7k",
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
        vgrp_gnZO5kOY357MNq: "optn_DWy4oG4g6M56Jx",
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
  };

  it("item prop is required and must be an object", () => {
    expect(ShoppingCartItem.props).toMatchObject({
      item: {
        type: Object,
        required: true,
      },
    });
  });

  it("increases quantity by 1", () => {
    const wrapper = shallowMount(ShoppingCartItem, { props: { item: item } });
    wrapper.find('[data-testid="btn-increase"]').trigger("click");

    expect(wrapper.emitted("update-quantity")).toEqual([
      [{ lineItemId: item.id, quantity: item.quantity + 1 }],
    ]);
  });

  it("decreases quantity by 1", () => {
    const wrapper = shallowMount(ShoppingCartItem, { props: { item: item } });
    wrapper.find('[data-testid="btn-decrease"]').trigger("click");

    expect(wrapper.emitted("update-quantity")).toEqual([
      [{ lineItemId: item.id, quantity: item.quantity - 1 }],
    ]);
  });

  it("removes an item from the cart when the quantity is 1 and the decrease button is triggered", () => {
    const wrapper = shallowMount(ShoppingCartItem, {
      props: { item: { ...item, quantity: 1 } },
    });

    wrapper.find('[data-testid="btn-decrease"]').trigger("click");

    expect(wrapper.emitted("remove-from-cart")).toEqual([
      [{ lineItemId: item.id }],
    ]);
  });

  it("removes an item from the cart when the remove button is clicked", () => {
    const wrapper = shallowMount(ShoppingCartItem, { props: { item: item } });
    wrapper.find('[data-testid="btn-remove"]').trigger("click");

    expect(wrapper.emitted("remove-from-cart")).toEqual([
      [{ lineItemId: item.id }],
    ]);
  });
});
