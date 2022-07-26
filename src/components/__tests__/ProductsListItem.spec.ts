import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProductsListItem from "../ProductsListItem.vue";

describe("ProductsListItem.vue", () => {
  const item = {
    id: "prod_4WJvlKqgkBobYV",
    created: 1652255295,
    updated: 1657976703,
    active: true,
    permalink: "qjMVmK",
    name: "Stripped T Shirt",
    description: "",
    price: {
      raw: 45,
      formatted: "45.00",
      formatted_with_symbol: "$45.00",
      formatted_with_code: "45.00 USD",
    },
    inventory: {
      managed: false,
      available: 0,
    },
    sku: null,
    sort_order: 0,
    seo: {
      title: null,
      description: null,
    },
    thank_you_url: null,
    meta: null,
    conditionals: {
      is_active: true,
      is_tax_exempt: false,
      is_pay_what_you_want: false,
      is_inventory_managed: false,
      is_sold_out: false,
      has_digital_delivery: false,
      has_physical_delivery: false,
      has_images: true,
      collects_fullname: false,
      collects_shipping_address: false,
      collects_billing_address: false,
      collects_extra_fields: true,
    },
    is: {
      active: true,
      tax_exempt: false,
      pay_what_you_want: false,
      inventory_managed: false,
      sold_out: false,
    },
    has: {
      digital_delivery: false,
      physical_delivery: false,
      images: true,
    },
    collects: {
      fullname: false,
      shipping_address: false,
      billing_address: false,
      extra_fields: true,
    },
    checkout_url: {
      checkout: "https://checkout.chec.io/qjMVmK?checkout=true",
      display: "https://checkout.chec.io/qjMVmK",
    },
    extra_fields: [
      {
        id: "extr_0YnEoqvVN5e7P6",
        name: "description",
        type: "text",
        required: false,
        options: null,
        meta: null,
        created: 1652291702,
        updated: 1652291702,
      },
    ],
    variant_groups: [
      {
        id: "vgrp_gnZO5kOY357MNq",
        name: "Size",
        meta: null,
        created: 1652255381,
        updated: 1652255381,
        options: [
          {
            id: "optn_Op1YoVpgqVlXLv",
            name: "XS",
            price: {
              raw: 0,
              formatted: "0.00",
              formatted_with_symbol: "$0.00",
              formatted_with_code: "0.00 USD",
            },
            assets: [],
            meta: null,
            created: 1652255381,
            updated: 1657976703,
          },
          {
            id: "optn_4WJvlKpgaMwbYV",
            name: "S",
            price: {
              raw: 0,
              formatted: "0.00",
              formatted_with_symbol: "$0.00",
              formatted_with_code: "0.00 USD",
            },
            assets: [],
            meta: null,
            created: 1652255381,
            updated: 1657976703,
          },
          {
            id: "optn_zkK6oL9grV5Xn0",
            name: "M",
            price: {
              raw: 0,
              formatted: "0.00",
              formatted_with_symbol: "$0.00",
              formatted_with_code: "0.00 USD",
            },
            assets: [],
            meta: null,
            created: 1652255381,
            updated: 1657976703,
          },
          {
            id: "optn_DWy4oG4g6M56Jx",
            name: "L",
            price: {
              raw: 0,
              formatted: "0.00",
              formatted_with_symbol: "$0.00",
              formatted_with_code: "0.00 USD",
            },
            assets: [],
            meta: null,
            created: 1652255381,
            updated: 1657976703,
          },
          {
            id: "optn_bWZ3l89BQvwkpE",
            name: "XL",
            price: {
              raw: 0,
              formatted: "0.00",
              formatted_with_symbol: "$0.00",
              formatted_with_code: "0.00 USD",
            },
            assets: [],
            meta: null,
            created: 1652255381,
            updated: 1657976703,
          },
        ],
      },
    ],
    categories: [
      {
        id: "cat_Kvg9l6m0251bB7",
        slug: "clothing",
        name: "Clothing",
      },
      {
        id: "cat_NqKE50YM1ldgBL",
        slug: "pants",
        name: "Pants",
      },
    ],
    assets: [
      {
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
      {
        id: "ast_ypbroE14m6o8n4",
        url: "https://cdn.chec.io/merchants/42877/assets/spXDkwCSjzxiI0RP|striped-fashion-shirt.jpg",
        description: null,
        is_image: true,
        filename: "striped-fashion-shirt.jpg",
        file_size: 63112,
        file_extension: "jpg",
        image_dimensions: {
          width: 1115,
          height: 744,
        },
        meta: [],
        created_at: 1652693687,
        updated_at: 1652693689,
      },
      {
        id: "ast_RyWOwmegaKwnEa",
        url: "https://cdn.chec.io/merchants/42877/assets/fzPpTis0KSYNWOU8|striped-t-shirt.jpg",
        description: null,
        is_image: true,
        filename: "striped-t-shirt.jpg",
        file_size: 55254,
        file_extension: "jpg",
        image_dimensions: {
          width: 1115,
          height: 744,
        },
        meta: [],
        created_at: 1652693687,
        updated_at: 1652693689,
      },
    ],
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
    related_products: [],
    attributes: [],
  };

  it("product prop is required and must be an object", () => {
    expect(ProductsListItem.props).toMatchObject({
      product: {
        type: Object,
        required: true,
      },
    });
  });

  it("renders a component as router-link", () => {
    const wrapper = mount(ProductsListItem, {
      props: {
        product: item,
      },
    });
    expect(wrapper.find("ROUTER-LINK").element.tagName).toBe("ROUTER-LINK");
  });

  it("renders an image and details", () => {
    const wrapper = mount(ProductsListItem, {
      props: {
        product: item,
      },
    });
    expect(wrapper.find("img").attributes().src).toEqual(item.assets[0].url);
    expect(wrapper.find("h3").text()).toBe(item.name);
    expect(wrapper.find("p").text()).toBe(item.price.formatted_with_symbol);
  });
});
