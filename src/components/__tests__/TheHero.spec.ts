import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TheHero from "../TheHero.vue";

const slides = [
  {
    img: "image-1",
    description: "first image",
  },
  {
    img: "image-2",
    description: "second image",
  },
  {
    img: "image-3",
    description: "thrid image",
  },
];

describe("TheHero.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(TheHero);
    expect(wrapper.find("#hero-section").element.id).toBe("hero-section");
  });

  it("creates image url", () => {
    const wrapper = shallowMount(TheHero);
    slides.forEach((slide) =>
      expect(wrapper.vm.getImageUrl(slide.img)).toContain(
        `/src/assets/images/${slide.img}.jpg`
      )
    );
  });
});
