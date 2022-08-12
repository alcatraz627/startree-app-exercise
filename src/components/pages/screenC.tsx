import React from "react";

import { Timer } from "../common";

import styles from "./page.scss";

const ScreenC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.pageTitle}>This is Screen C</div>
            <div className={styles.pageContent}>
                “Walking on water and developing software from a specification
                are easy if both are frozen.”
                <br />
                <span className={styles.author}>~ Edward V. Berard</span>
            </div>
            <Timer />
        </div>
    );
};

export default ScreenC;
