import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseSkeleton from "../BaseSkeleton.vue";

describe("BaseSkeleton.vue", () => {
  it("renders a component with default values", () => {
    const wrapper = shallowMount(BaseSkeleton);
    expect(wrapper.classes("skeleton")).toBe(true);
    expect(wrapper.props("type")).toBe("text");
    expect(wrapper.props("height")).toBe("1.5rem");
    expect(wrapper.props("width")).toBe("10rem");
  });

  it("renders a component as box type ", () => {
    const wrapper = shallowMount(BaseSkeleton, {
      props: {
        type: "box",
      },
    });
    expect(wrapper.props("type")).toBe("box");
    expect(wrapper.props("height")).toBe("10rem");
    expect(wrapper.props("width")).toBe("20rem");
  });

  it("renders a component with custom values ", () => {
    const propsContent = {
      type: "box",
      height: "30rem",
      width: "30rem",
    };
    const wrapper = shallowMount(BaseSkeleton, {
      props: propsContent,
    });
    expect(wrapper.props("type")).toBe(propsContent.type);
    expect(wrapper.props("height")).toBe(propsContent.height);
    expect(wrapper.props("width")).toBe(propsContent.width);
  });

  it("renders a component with slot content ", () => {
    const slotContent = "<div>Test</div>";
    const wrapper = shallowMount(BaseSkeleton, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.html()).toContain(slotContent);
  });
});
