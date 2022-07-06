import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseNumber from "../BaseNumber.vue";

describe("BaseNumber.vue", () => {
  it("uses 01 as the default value", () => {
    const defaultValue = BaseNumber.props.number.default;
    expect("01").toBe(defaultValue);
  });

  it("accepts only valid number props", () => {
    const validNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
    const validator = BaseNumber.props.number.validator;
    validNumbers.forEach((valid) => expect(validator(valid)).toBe(true));
    expect(validator("11")).toBe(false);
  });

  it("renders component with correct value", () => {
    const number = "05";
    const wrapper = shallowMount(BaseNumber, {
      props: {
        number: number,
      },
    });
    expect(wrapper.find(".number").text()).toBe(number);
  });
});
