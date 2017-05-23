import { shallow } from "enzyme";
import * as React from "react";

import Image from "../../../src/ts/components/Image/Image";

test("load image", () => {
    const wrapper = shallow(<Image/>);
    expect(wrapper.find("img")).toBeTruthy();
});
