import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ProductsListItemSkeleton from "../ProductsListItemSkeleton.vue";

describe("ProductsListItemSkeleton.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(ProductsListItemSkeleton);
    expect(wrapper.classes("product__card-skeleton")).toBe(true);
  });
});
