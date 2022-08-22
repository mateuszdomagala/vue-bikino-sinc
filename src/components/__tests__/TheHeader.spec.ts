import { describe, it, expect, vi } from "vitest";
import { shallowMount, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import TheHeader from "../TheHeader.vue";

const Home = { template: "<div>Home</div>" };
const Shop = { template: "<div>Shop</div>" };

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/shop", name: "shop", component: Shop },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

describe("TheHeader.vue", () => {
  it("cartTotalItems prop is a number and defaults to 0", () => {
    expect(TheHeader.props).toMatchObject({
      cartTotalItems: {
        type: Number,
        default: 0,
      },
    });
  });

  it("renders header links correctly", () => {
    const wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-testid="logo"]').attributes().to).toBe("/");
    expect(wrapper.find('[data-testid="facebook"]').attributes().href).toBe(
      "https://www.facebook.com/"
    );
    expect(wrapper.find('[data-testid="twitter"]').attributes().href).toBe(
      "https://twitter.com/"
    );
  });

  it("opens a modal when the search button is clicked", async () => {
    const wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.vm.isModalOpen).toBe(false);
    await wrapper.find('[data-testid="search"]').trigger("click");
    expect(wrapper.vm.isModalOpen).toBe(true);
  });

  it("emits shopping-cart event when the shopping cart button is clicked", async () => {
    const wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-testid="shopping-cart"]').trigger("click");
    expect(wrapper.emitted("shopping-cart")).toBeTruthy();
  });

  it("renders the correct number of items in the shopping cart", () => {
    const totalItems = 5;
    const wrapper = mount(TheHeader, {
      global: {
        plugins: [router],
      },
      props: {
        cartTotalItems: totalItems,
      },
    });

    expect(wrapper.find(".circle__total").text()).toBe(totalItems.toString());
  });

  it("renders menu when menu icon is clicked", async () => {
    const wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.vm.isMenuOpen).toBe(false);
    await wrapper.find('[data-testid="menu"]').trigger("click");
    expect(wrapper.vm.isMenuOpen).toBe(true);
  });

  it("renders menu links correctly", async () => {
    const wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-testid="menu"]').trigger("click");

    expect(wrapper.find('[data-testid="home"]').attributes().to).toBe("/");
    expect(wrapper.find('[data-testid="shop"]').attributes().to).toBe("/shop");
    expect(wrapper.find('[data-testid="categories"]').attributes().to).toBe(
      "/categories"
    );
  });

  it("changes path to shop with page number and search keyword as query when an input value is submitted", async () => {
    const inputValue = "Test";
    const wrapper = mount(TheHeader, {
      global: {
        plugins: [router],
        stubs: {
          transition: false,
        },
      },
    });

    const push = vi.spyOn(router, "push");

    await wrapper.find('[data-testid="search"]').trigger("click");
    await wrapper.find("input").setValue(inputValue);
    await wrapper.find("form").trigger("submit.prevent");

    expect(push).toHaveBeenCalledWith({
      path: "/shop",
      query: { page: 1, search: inputValue },
    });
  });
});
