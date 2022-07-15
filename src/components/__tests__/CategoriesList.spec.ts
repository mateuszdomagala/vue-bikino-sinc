import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CategoriesList from "../CategoriesList.vue";

describe("CategoriesList.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(CategoriesList);
    expect(wrapper.classes("categories")).toBe(true);
  });

  it("renders a component with the given prop", () => {
    const array = [{}, {}];
    const wrapper = shallowMount(CategoriesList, {
      props: {
        categories: array,
      },
    });
    expect(wrapper.element.children.length).toBe(array.length);
  });
});
