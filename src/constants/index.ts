export const DEFAULT_DURATION =
    parseInt(process.env.DEFAULT_INTERVAL, 10) || 3600000;

export const DATE_FORMAT =
    process.env.CUSTOM_DATE_FORMAT || "HH'h' mm'm' ss's'";

// 23 h 59m 59s
export const MAX_SECONDS_IN_A_DAY = 1000 * (60 * 60 * 24 - 1);

export const ROUTES = {
    ScreenA: { route: "screen-a", title: "Screen A", minifiedTitle: "A" },
    ScreenB: { route: "screen-b", title: "Screen B", minifiedTitle: "B" },
    ScreenC: { route: "screen-c", title: "Screen C", minifiedTitle: "C" },
};

export const DEFAULT_ROUTE = ROUTES.ScreenA.route;
