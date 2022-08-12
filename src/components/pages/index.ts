import { lazy } from "react";

const ScreenA = lazy(() => import("./screenA"));
const ScreenB = lazy(() => import("./screenB"));
const ScreenC = lazy(() => import("./screenC"));

export { ScreenA, ScreenB, ScreenC };
