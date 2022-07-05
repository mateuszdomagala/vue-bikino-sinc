import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CarouselSliderItem from "../CarouselSliderItem.vue";

describe("CarouselSliderItem.vue", () => {
  it("renders content via default slot", () => {
    const slotContent = `<div data-testid="slide"></div>`;
    const wrapper = shallowMount(CarouselSliderItem, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.classes("carousel__slide")).toBe(true);
    expect(wrapper.find('[data-testid="slide"]').html()).toBe(slotContent);
  });
});
