import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TheFooter from "../TheFooter.vue";

describe("TheFooter.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(TheFooter);
    expect(wrapper.find("#store-locations").element.id).toBe("store-locations");
  });
});
