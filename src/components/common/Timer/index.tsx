import React, { useState, useEffect, useRef } from "react";
import { format, addMilliseconds } from "date-fns";
import { useSearchParams } from "react-router-dom";

import styles from "./timer.scss";

const DEFAULT_INTERVAL = 1000 * 60 * 60 * 2.5;

const DATE_FORMAT = "HH:mm:ss";

const Timer = ({ userDuration }: { userDuration?: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [endTime, setEndTime] = useState(Date.now());

    const timer = useRef<number | null>();

    const duration: number =
        parseInt(searchParams.get("duration") || "", 10) || DEFAULT_INTERVAL;

    const startTime: number = addMilliseconds(endTime, -1 * duration).valueOf();

    const outputStrings = {
        startTime: {
            label: "Start Time",
            value: format(startTime, DATE_FORMAT),
        },
        duration: { label: "Duration", value: format(duration, DATE_FORMAT) },
        endTime: { label: "End Time", value: format(endTime, DATE_FORMAT) },
    };

    const updateEndTime = (newEndTime: number) => {
        if (!newEndTime) return;

        setEndTime(newEndTime);

        setSearchParams({
            startTime: `${startTime}`,
            duration: `${duration}`,
            endTime: `${endTime}`,
        });
    };

    useEffect(() => {
        timer.current = setInterval(() => {
            updateEndTime(Date.now());
        }, 1000);
        return () => {
            if (typeof timer.current === "number") {
                clearInterval(timer.current);
                timer.current = null;
            }
        };
    });

    return (
        <div className={styles.root}>
            <div className={styles.title}>Timer</div>

            <div className={styles.timerRow}>
                {Object.values(outputStrings).map(({ label, value }) => (
                    <div className={styles.timerItem}>
                        <div className={styles.timerItemLabel}>{label}</div>
                        <div className={styles.timerItemValue}>{value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timer;
