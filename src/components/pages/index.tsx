import React from "react";

import { Timer } from "../common";

import styles from "./page.scss";

const Page = ({ index }: { index: number }) => {
    return (
        <div className={styles.page}>
            <div className={styles.pageTitle}>
                Page {index}
                <hr />
            </div>
            <Timer />
        </div>
    );
};

export default Page;
