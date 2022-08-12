import React, { useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";

import styles from "./app.scss";

import { Navbar } from "../common";
import { ROUTES, DEFAULT_ROUTE } from "../../constants";
import { ScreenA, ScreenB, ScreenC } from "../pages";

const ROUTE_MAPPING = {
    [ROUTES.ScreenA.route]: ScreenA,
    [ROUTES.ScreenB.route]: ScreenB,
    [ROUTES.ScreenC.route]: ScreenC,
};

const Main = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // If the user navigates to an unrecognised route, bring them back to the default route
    // Also works to navigate the page to the intended default route when the user lands on the root route
    useEffect(() => {
        if (
            !Object.values(ROUTES)
                .map(({ route }) => `/${route}`)
                .includes(pathname)
        ) {
            navigate(`/${DEFAULT_ROUTE}`);
        }
    }, [pathname]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <Routes>
                    {Object.entries(ROUTE_MAPPING).map(([route, Component]) => (
                        <Route
                            key={route}
                            path={route}
                            element={<Component />}
                        />
                    ))}
                </Routes>
            </div>
        </div>
    );
};

const Root = () => (
    <BrowserRouter>
        <Navbar />
        <Main />
    </BrowserRouter>
);

export default Root;
