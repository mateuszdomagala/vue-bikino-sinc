import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseSearch from "../BaseSearch.vue";

describe("BaseSearch.vue", () => {
  it("emits an input event", async () => {
    const inputValue = "Jacket";
    const wrapper = shallowMount(BaseSearch);

    await wrapper.find("input").setValue(inputValue);
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("input")).toEqual([[inputValue]]);
  });

  it("focuses an input on mount", () => {
    const wrapper = shallowMount(BaseSearch, { attachTo: document.body });

    expect(wrapper.find("input").element).toBe(document.activeElement);
  });
});
