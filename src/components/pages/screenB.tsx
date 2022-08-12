import React from "react";

import { Timer } from "../common";

import styles from "./page.scss";

const ScreenB = () => {
    return (
        <div className={styles.page}>
            <div className={styles.pageTitle}>This is Screen B</div>
            <div className={styles.pageContent}>
                “If the automobile had followed the same development cycle as
                the computer, a Rolls-Royce would today cost $100, get a million
                miles per gallon, and explode once a year, killing everyone
                inside.”
                <br />
                <span className={styles.author}>~ Robert X. Cringely</span>
            </div>
            <Timer />
        </div>
    );
};

export default ScreenB;
