"use strict";

import React from "react";
import { createRoot } from "react-dom/client";

import AppRoot from "./components/Root";

import "./styles/global.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);
const renderApp = () => root.render(<AppRoot />);

renderApp();

if (module.hot) {
    module.hot.accept("./components/Root", () => {
        renderApp();
    });
}
