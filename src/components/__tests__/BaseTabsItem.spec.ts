import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseTabsItem from "../BaseTabsItem.vue";

describe("BaseTabsItem.vue", () => {
  it("title prop is required and must be a string", () => {
    expect(BaseTabsItem.props).toMatchObject({
      title: {
        type: String,
        required: true,
      },
    });
  });

  it("shows a component when title matches selectedTitle", () => {
    const title = "Tab title";
    const wrapper = shallowMount(BaseTabsItem, {
      props: {
        title: title,
      },
      global: {
        provide: {
          selectedTitle: title,
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it("does not show a component when title does not match selectedTitle", () => {
    const title = "Tab title";
    const selectedTitle = "Different tab title";
    const wrapper = shallowMount(BaseTabsItem, {
      props: {
        title: title,
      },
      global: {
        provide: {
          selectedTitle: selectedTitle,
        },
      },
    });
    expect(wrapper.isVisible()).toBe(false);
  });

  it("renders content via default slot", () => {
    const title = "Tab title";
    const slotContent = "Tab content";
    const wrapper = shallowMount(BaseTabsItem, {
      props: {
        title: title,
      },
      global: {
        provide: {
          selectedTitle: title,
        },
      },
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.find(".tab-content").text()).toBe(slotContent);
  });
});
