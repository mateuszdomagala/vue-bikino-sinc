import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CategoriesListItem from "../CategoriesListItem.vue";

describe("CategoriesListItem.vue", () => {
  const item = {
    id: "cat_L1vOoZXrMlRa8Z",
    parent_id: null,
    slug: "bags",
    name: "Bags",
    description: "super",
    products: 1,
    created: 1656958524,
    updated: 1657544086,
    meta: null,
    assets: [
      {
        id: "ast_AYrQlWaYqbonbR",
        url: "https://cdn.chec.io/merchants/42877/assets/OKm7XL5jifU94otf|woman3.jpg",
        description: null,
        is_image: true,
        filename: "woman3.jpg",
        file_size: 676264,
        file_extension: "jpg",
        image_dimensions: {
          width: 1974,
          height: 2961,
        },
        meta: [],
        created_at: 1656958518,
        updated_at: 1656958522,
      },
    ],
    children: [],
  };

  it("category prop is required and must be an object", () => {
    expect(CategoriesListItem.props).toMatchObject({
      category: {
        type: Object,
        required: true,
      },
    });
  });

  it("renders a component as router-link", () => {
    const wrapper = mount(CategoriesListItem, {
      props: {
        category: item,
      },
    });
    expect(wrapper.find("ROUTER-LINK").element.tagName).toBe("ROUTER-LINK");
  });

  it("renders an image and details", () => {
    const wrapper = mount(CategoriesListItem, {
      props: {
        category: item,
      },
    });
    expect(wrapper.find("img").attributes().src).toEqual(item.assets[0].url);
    expect(wrapper.find("h3").text()).toBe(item.name);
    expect(wrapper.find("p").text()).toBe(item.description);
  });
});
