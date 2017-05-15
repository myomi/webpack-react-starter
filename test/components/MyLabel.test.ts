import test from "ava";

import MyLabel from "../../src/ts/components/MyLabel";

test("MyLabel", async (t) => {
    const label = MyLabel({});
    t.truthy(label);
});
