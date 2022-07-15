import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TheShop from "../TheShop.vue";

describe("CategoriesList.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(TheShop);
    expect(wrapper.find("#store").element.id).toBe("store");
  });
});
