import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseTabs from "../BaseTabs.vue";

describe("BaseTabs.vue", () => {
  it("renders content via default slot", () => {
    const wrapper = shallowMount(BaseTabs, {
      slots: {
        default:
          '<div title="Tab 1">Tab content 1</div><div title="Tab 2">Tab content 2</div>',
      },
    });
    const tabs = wrapper.findAll("li");
    expect(tabs.length).toBe(2);
    expect(tabs[0].text()).toContain("Tab 1");
    expect(tabs[1].text()).toContain("Tab 2");
  });

  it("changes the active tab to a clicked one", async () => {
    const wrapper = shallowMount(BaseTabs, {
      slots: {
        default:
          '<div title="Tab 1">Tab content 1</div><div title="Tab 2">Tab content 2</div>',
      },
    });
    const tabs = wrapper.findAll("li");
    expect(tabs[0].classes("active")).toBe(true);

    await tabs[1].trigger("click");
    expect(tabs[1].classes("active")).toBe(true);
  });
});
