// css
import "../sass/index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import MyLabel from "./components/MyLabel";
import TextAreaCounter from "./components/TextAreaCounter";

ReactDOM.render(
    <div>
        <MyLabel />
        <TextAreaCounter defaultValue="hello"/>
    </div>,
    document.getElementById("app"),
);
