import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./navbar.scss";
import { ROUTES } from "../../../../src/constants";
import commonStyles from "../../../styles/common.scss";

const Navbar = () => {
    const { search } = useLocation();

    return (
        <div className={styles.root}>
            <a href={window.location.origin} className={styles.title}>
                Navbar
            </a>
            <div className={styles.links}>
                {Object.values(ROUTES).map(
                    ({ route, title, minifiedTitle }) => (
                        <NavLink
                            className={({ isActive }) =>
                                `${styles.link} ${
                                    isActive ? styles.activeLink : ""
                                }`
                            }
                            key={route}
                            to={`${route}${search}`}
                        >
                            <div className={commonStyles.onlyDesktop}>
                                {title}
                            </div>
                            <div className={commonStyles.onlyMobile}>
                                {minifiedTitle}
                            </div>
                        </NavLink>
                    )
                )}
            </div>
        </div>
    );
};

export default Navbar;
