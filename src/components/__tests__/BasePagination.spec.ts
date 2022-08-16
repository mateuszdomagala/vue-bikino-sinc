import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BasePagination from "../BasePagination.vue";

describe("BasePagination.vue", () => {
  it("totalPages, perPage, currentPage props are required and must be a number", () => {
    expect(BasePagination.props).toMatchObject({
      totalPages: {
        type: Number,
        required: true,
      },
      perPage: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
    });
  });

  it("maxVisibleButtons is not required, it is a number and defaults to 3", () => {
    expect(BasePagination.props).toMatchObject({
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3,
      },
    });
  });

  it("goes to the first page", () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalPages: 10,
        perPage: 6,
        currentPage: 3,
      },
    });
    wrapper.find('[data-testid="first"]').trigger("click");
    expect(wrapper.emitted("pagechanged")).toEqual([[1]]);
  });

  it("goes to the previous page", () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalPages: 10,
        perPage: 6,
        currentPage: 3,
      },
    });
    wrapper.find('[data-testid="previous"]').trigger("click");
    expect(wrapper.emitted("pagechanged")).toEqual([[2]]);
  });

  it("goes to the selected page", () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalPages: 10,
        perPage: 6,
        currentPage: 3,
      },
    });
    wrapper.find('[data-testid="page"]').trigger("click");
    expect(wrapper.emitted("pagechanged")).toEqual([[2]]);
  });

  it("goes to the next page", () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalPages: 10,
        perPage: 6,
        currentPage: 3,
      },
    });
    wrapper.find('[data-testid="next"]').trigger("click");
    expect(wrapper.emitted("pagechanged")).toEqual([[4]]);
  });

  it("goes to the last page", () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalPages: 10,
        perPage: 6,
        currentPage: 3,
      },
    });
    wrapper.find('[data-testid="last"]').trigger("click");
    expect(wrapper.emitted("pagechanged")).toEqual([[10]]);
  });

  it("renders active pagination element", () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalPages: 10,
        perPage: 6,
        currentPage: 1,
      },
    });
    const item = wrapper.find('[data-testid="page"]');
    expect(item.classes("active")).toBe(true);
    expect(item.attributes().disabled).toBe("true");
  });

  it("renders disabled pagination elements", async () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalPages: 10,
        perPage: 6,
        currentPage: 1,
      },
    });
    expect(wrapper.find('[data-testid="first"]').attributes().disabled).toBe(
      "true"
    );
    expect(wrapper.find('[data-testid="previous"]').attributes().disabled).toBe(
      "true"
    );
    expect(wrapper.find('[data-testid="page"]').attributes().disabled).toBe(
      "true"
    );
    expect(wrapper.find('[data-testid="last"]').attributes().disabled).toBe(
      "false"
    );

    await wrapper.setProps({ currentPage: 3 });

    expect(wrapper.find('[data-testid="first"]').attributes().disabled).toBe(
      "false"
    );
    expect(wrapper.find('[data-testid="previous"]').attributes().disabled).toBe(
      "false"
    );
    expect(
      wrapper.findAll('[data-testid="page"]')[1].attributes().disabled
    ).toBe("true");
    expect(wrapper.find('[data-testid="last"]').attributes().disabled).toBe(
      "false"
    );

    await wrapper.setProps({ currentPage: 10 });

    expect(wrapper.find('[data-testid="last"]').attributes().disabled).toBe(
      "true"
    );
    expect(wrapper.find('[data-testid="next"]').attributes().disabled).toBe(
      "true"
    );
    expect(wrapper.find('[data-testid="first"]').attributes().disabled).toBe(
      "false"
    );
  });
});
