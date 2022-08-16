import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseModal from "../BaseModal.vue";
import { nextTick } from "vue";

describe("BaseModal.vue", () => {
  it("visibleModal is false, visibleContent is true, and variant is center by default", () => {
    expect(BaseModal.props).toMatchObject({
      visibleModal: {
        type: Boolean,
        default: false,
      },
      visibleContent: {
        type: Boolean,
        default: true,
      },
      variant: {
        type: String,
        default: "center",
      },
    });
  });

  it("accepts only valid variants props", () => {
    const validVariants = ["center", "right", "top"];
    const validator = BaseModal.props.variant.validator;
    validVariants.forEach((valid) => expect(validator(valid)).toBe(true));
    expect(validator("basic")).toBe(false);
  });

  it("renders content via named slots", async () => {
    const wrapper = shallowMount(BaseModal, {
      props: {
        visibleModal: true,
      },
      slots: {
        header: "<div>Header</div>",
        content: "<div>Content</div>",
      },
    });

    wrapper.vm.showContent = true;
    await nextTick();

    expect(wrapper.html()).toContain("<div>Header</div>");
    expect(wrapper.html()).toContain("<div>Content</div>");
  });

  it("emits a close event", async () => {
    const wrapper = shallowMount(BaseModal, {
      props: {
        visibleModal: true,
      },
      global: {
        stubs: {
          transition: false,
        },
      },
    });

    wrapper.vm.showContent = true;
    await nextTick();
    await wrapper.find("base-button-stub").trigger("click");
    expect(wrapper.vm.showContent).toBe(false);
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("doesn't show when visibleModal is false", async () => {
    const wrapper = shallowMount(BaseModal, {
      props: {
        visibleModal: false,
      },
    });

    expect(wrapper.find(".modal-backdrop").exists()).toBe(false);
  });
});
