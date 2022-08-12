import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./navbar.scss";

const ROUTES = [
    { route: "screen-a", title: "Screen A", minifiedTitle: "A" },
    { route: "screen-b", title: "Screen B", minifiedTitle: "B" },
    { route: "screen-c", title: "Screen C", minifiedTitle: "C" },
];

const Navbar = () => {
    const { search } = useLocation();

    return (
        <div className={styles.root}>
            <a href={window.location.origin} className={styles.title}>
                Navbar
            </a>
            <div className={styles.links}>
                {ROUTES.map(({ route, title }) => (
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.link} ${
                                isActive ? styles.activeLink : ""
                            }`
                        }
                        key={route}
                        to={`${route}${search}`}
                    >
                        {title}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
