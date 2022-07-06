import { describe, it, expect } from "vitest";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import BaseLink from "../BaseLink.vue";

describe("BaseLink.vue", () => {
  it("renders content via default slot", () => {
    const slotContent = "More Details";
    const wrapper = shallowMount(BaseLink, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.find("a").text()).toBe(slotContent);
  });

  it("renders a router-link tag when 'to' is specified (as String)", () => {
    const to = "/example";
    const wrapper = shallowMount(BaseLink, {
      props: {
        to: to,
      },
    });
    expect(wrapper.find("router-link").attributes().to).toBe(to);
  });

  it("renders a router-link tag when 'to' is specified (as Object)", () => {
    const path = "/example";
    const to = { path: path };
    const wrapper = shallowMount(BaseLink, {
      props: {
        to: to,
      },
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
    });
    expect(wrapper.findComponent(RouterLinkStub).props("to").path).toBe(path);
  });

  it("renders an <a> element when 'href' is specified", () => {
    const href = "https://example.com";
    const wrapper = shallowMount(BaseLink, {
      props: {
        href: href,
      },
    });
    expect(wrapper.find("a").attributes().href).toBe(href);
  });

  it("renders an <a> element when 'href' and 'to' props are specified", () => {
    const to = "/example";
    const href = "https://example.com";
    const wrapper = shallowMount(BaseLink, {
      props: {
        to: to,
        href: href,
      },
    });
    expect(wrapper.find("a").attributes().href).toBe(href);
  });

  it("accepts only valid variants props", () => {
    const validVariants = ["primary", "secondary", "tertiary"];
    const validator = BaseLink.props.variant.validator;
    validVariants.forEach((valid) => expect(validator(valid)).toBe(true));
    expect(validator("basic")).toBe(false);
  });
});
