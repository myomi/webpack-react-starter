import test from "ava";
import { shallow } from "enzyme";
import * as React from "react";

import MyLabel from "../../src/ts/components/MyLabel";

test("MyLabel has no message", async (t) => {
    const wrapper = shallow(<MyLabel/>);
    t.is(wrapper.text(), "");
});

test("MyLabel has message", async (t) => {
    const wrapper = shallow(<MyLabel message="hello"/>);
    t.is(wrapper.text(), "hello");
});
