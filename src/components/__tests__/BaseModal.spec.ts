import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseModal from "../BaseModal.vue";

describe("BaseModal.vue", () => {
  it("renders content via named slots", () => {
    const wrapper = shallowMount(BaseModal, {
      props: {
        visible: true,
      },
      slots: {
        header: "<div>Header</div>",
        content: "<div>Content</div>",
      },
    });
    expect(wrapper.html()).toContain("<div>Header</div>");
    expect(wrapper.html()).toContain("<div>Content</div>");
  });

  it("emits a close event", async () => {
    const wrapper = shallowMount(BaseModal, {
      props: {
        visible: true,
      },
    });
    await wrapper.find("base-button-stub").trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });
});
