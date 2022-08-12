import React from "react";

import { Timer } from "../common";

import styles from "./page.scss";

const Page = ({ index }: { index: number }) => {
    return (
        <div className={styles.page}>
            Page {index}
            <hr />
            <Timer />
        </div>
    );
};

export default Page;
