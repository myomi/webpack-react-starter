// css
import "../sass/index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import Image from "./components/Image/Image";
import MyLabel from "./components/MyLabel";
import TextAreaCounter from "./components/TextAreaCounter";

ReactDOM.render(
    <div>
        <MyLabel />
        <TextAreaCounter defaultValue="hello"/>
        <Image/>
    </div>,
    document.getElementById("app"),
);
