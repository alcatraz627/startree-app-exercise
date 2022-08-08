"use strict";

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";

import "./global.scss";

const renderApp = () =>
    createRoot(document.getElementById("root")!).render(<App />);

renderApp();

if (module.hot) {
    module.hot.accept("./components/App", () => {
        renderApp();
    });
}
