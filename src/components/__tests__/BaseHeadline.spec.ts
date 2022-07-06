import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseHeadline from "../BaseHeadline.vue";

describe("BaseHeadline.vue", () => {
  it("text prop is required and must be a string", () => {
    expect(BaseHeadline.props).toMatchObject({
      text: {
        type: String,
        required: true,
      },
    });
  });

  it("accepts only valid variants props", () => {
    const validVariants = ["h1", "h2"];
    const validator = BaseHeadline.props.type.validator;
    validVariants.forEach((valid) => expect(validator(valid)).toBe(true));
    expect(validator("h3")).toBe(false);
  });

  it("renders headline as h1 if type is h1", () => {
    const wrapper = shallowMount(BaseHeadline, {
      props: {
        type: "h1",
        text: "text",
      },
    });
    expect(wrapper.find("h1").classes("headline--h1")).toBe(true);
  });

  it("renders content with default type", () => {
    const text = "Test";
    const wrapper = shallowMount(BaseHeadline, {
      props: {
        text: text,
      },
    });
    expect(wrapper.find("h2").classes("headline--h2")).toBe(true);
    expect(wrapper.find("h2").text()).toBe(text);
  });

  it("renders a line", () => {
    const wrapper = shallowMount(BaseHeadline, {
      props: {
        line: true,
        text: "text",
      },
    });
    expect(wrapper.find("span").classes("headline__line")).toBe(true);
  });
});
