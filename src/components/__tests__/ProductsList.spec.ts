import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ProductsList from "../ProductsList.vue";

describe("ProductsList.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(ProductsList);
    expect(wrapper.classes("products")).toBe(true);
  });

  it("renders a component with the given prop", () => {
    const array = [{}, {}];
    const wrapper = shallowMount(ProductsList, {
      props: {
        products: array,
      },
    });
    expect(wrapper.element.children.length).toBe(array.length);
  });
});
