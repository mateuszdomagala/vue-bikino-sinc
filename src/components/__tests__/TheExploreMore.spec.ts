import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TheExploreMore from "../TheExploreMore.vue";

describe("TheExploreMore.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(TheExploreMore);
    expect(wrapper.find("#explore-more").element.id).toBe("explore-more");
  });
});
