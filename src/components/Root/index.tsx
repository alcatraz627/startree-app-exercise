import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./app.scss";

import { Timer, Navbar } from "../common";
import Page from "../pages";

const Root = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className={styles.root}>
                <div className={styles.container}>
                    <Routes>
                        <Route path="screen-a" element={<Page index={1} />} />
                        <Route path="screen-b" element={<Page index={2} />} />
                        <Route path="screen-c" element={<Page index={3} />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Root;
