import { shallow } from "enzyme";
import * as React from "react";

import MyLabel from "../../src/ts/components/MyLabel";

test("MyLabel has no message", () => {
    const wrapper = shallow(<MyLabel/>);
    expect(wrapper.text()).toBe("");
});

test("MyLabel has message", () => {
    const wrapper = shallow(<MyLabel message="hello"/>);
    expect(wrapper.text()).toBe("hello");
});
