import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CarouselSlider from "../CarouselSlider.vue";

describe("CarouselSlider.vue", () => {
  it("slideCount prop is required and must be a number", () => {
    expect(CarouselSlider.props).toMatchObject({
      slideCount: {
        type: Number,
        required: true,
      },
    });
  });

  it("renders content via default slot", () => {
    const slideCount = 3;
    const slotContent = `<div class="carousel__slide" v-for="item in ${slideCount}" :key="item"></div>`;
    const wrapper = shallowMount(CarouselSlider, {
      slots: {
        default: slotContent,
      },
      props: {
        slideCount: slideCount,
      },
    });
    expect(wrapper.findAll(".carousel__slide").length).toBe(slideCount);
  });

  it("changes slides during autoplay", () => {
    const wrapper = shallowMount(CarouselSlider, {
      props: {
        slideCount: 3,
      },
    });

    vi.useFakeTimers();
    expect(wrapper.vm.currentActiveSlide).toBe(0);
    wrapper.vm.autoPlay();
    vi.runOnlyPendingTimers();
    expect(wrapper.vm.currentActiveSlide).toBe(1);
    vi.runOnlyPendingTimers();
    expect(wrapper.vm.currentActiveSlide).toBe(2);
    vi.runOnlyPendingTimers();
    expect(wrapper.vm.currentActiveSlide).toBe(0);
  });

  it("manages next and previous accordingly", async () => {
    const slotContent = `
        <button data-testid="button-next" @click="nextSlide">Next</button>
        <button data-testid="button-previous"  @click="prevSlide">Previous</button>
    `;
    const wrapper = shallowMount(CarouselSlider, {
      props: {
        slideCount: 3,
      },
      slots: {
        default: slotContent,
      },
    });

    const nextButton = wrapper.find('[data-testid="button-next"]');
    const prevButton = wrapper.find('[data-testid="button-previous"]');

    expect(wrapper.vm.currentActiveSlide).toBe(0);
    expect(wrapper.vm.nextActiveSlide).toBe(1);

    await nextButton.trigger("click");

    expect(wrapper.vm.currentActiveSlide).toBe(1);
    expect(wrapper.vm.nextActiveSlide).toBe(2);

    await nextButton.trigger("click");

    expect(wrapper.vm.currentActiveSlide).toBe(2);
    expect(wrapper.vm.nextActiveSlide).toBe(0);

    await prevButton.trigger("click");

    expect(wrapper.vm.currentActiveSlide).toBe(1);
    expect(wrapper.vm.nextActiveSlide).toBe(2);
  });
});
