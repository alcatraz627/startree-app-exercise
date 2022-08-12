import React from "react";

import { Timer } from "../common";

import styles from "./page.scss";

const ScreenA = () => {
    return (
        <div className={styles.page}>
            <div className={styles.pageTitle}>This is Screen A</div>
            <div className={styles.pageContent}>
                “ Code is like humor. When you have to explain it, it's bad.”
                <br />
                <span className={styles.author}>
                ~ Cory House
                </span>
            </div>
            <Timer />
        </div>
    );
};

export default ScreenA;
