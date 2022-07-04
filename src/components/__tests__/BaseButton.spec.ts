import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseButton from "../BaseButton.vue";

describe("BaseButton", () => {
  it("variant prop is required and must be a string", () => {
    expect(BaseButton.props).toMatchObject({
      variant: {
        type: String,
        required: true,
      },
    });
  });

  it("renders content via default slot", () => {
    const slotContent = "More Details";
    const wrapper = shallowMount(BaseButton, {
      slots: {
        default: slotContent,
      },
      props: {
        variant: "primary",
      },
    });
    expect(wrapper.find("button").text()).toBe(slotContent);
  });

  it("renders button with correct variant", () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        variant: "secondary",
      },
    });
    expect(wrapper.classes("btn--secondary")).toBe(true);
  });

  it("accepts only valid variants props", () => {
    const validVariants = ["primary", "secondary", "tertiary"];
    const validator = BaseButton.props.variant.validator;
    validVariants.forEach((valid) => expect(validator(valid)).toBe(true));
    expect(validator("basic")).toBe(false);
  });

  it("raises click event when clicked", async () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        variant: "secondary",
      },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
