import React, { useState, useEffect, useRef } from "react";
import { format, addMilliseconds } from "date-fns";
import { useSearchParams } from "react-router-dom";

import { useStore } from "../../../data/index";

import styles from "./timer.scss";

import {
    DEFAULT_DURATION,
    DATE_FORMAT,
    MAX_SECONDS_IN_A_DAY,
} from "../../../constants";

const getOutputData = ({
    startTime,
    duration,
    endTime,
}: {
    startTime: number;
    duration: number;
    endTime: number;
}) => ({
    startTime: {
        label: "Start Time",
        value: format(startTime, DATE_FORMAT),
    },
    duration: {
        label: "Duration",
        value: format(
            duration + new Date(duration).getTimezoneOffset() * 1000 * 60,
            DATE_FORMAT
        ),
    },
    endTime: { label: "End Time", value: format(endTime, DATE_FORMAT) },
});

const Timer = ({ userDuration }: { userDuration?: number }) => {
    // 1. For a larger application, selectors can be used to access store values
    // 2. This destructuring might not be a good idea in a large application since
    // we're importing the entire state before extracting the required values,
    // but since we are using everything that the store has, this should not be an issue.
    const { duration, setDuration, endTime, setEndTime } = useStore(
        (state) => state
    );

    const [, setSearchParams] = useSearchParams();

    const timer = useRef<number | null>();

    const startTime: number = addMilliseconds(endTime, -1 * duration).valueOf();

    const outputStrings = getOutputData({ startTime, duration, endTime });

    const isCustomDuration: boolean = duration !== DEFAULT_DURATION;

    const updateEndTime = (newEndTime: number): void => {
        if (!newEndTime) return;

        setEndTime(newEndTime);

        setSearchParams({
            startTime: `${startTime}`,
            duration: `${duration}`,
            endTime: `${endTime}`,
        });
    };

    const handleUpdateDuration = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newDuration = parseInt(e.target.value, 10);
        if (newDuration && newDuration !== NaN && newDuration > 0) {
            setDuration(Math.min(newDuration * 1000, MAX_SECONDS_IN_A_DAY));
        }
    };

    const handleReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        setDuration(DEFAULT_DURATION);

        return false;
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

            <div className={styles.inputContainer}>
                <div className={styles.beforeInput}>
                    <label className={styles.inputLabel} htmlFor="duration">
                        Enter a duration (in seconds)
                    </label>
                    {isCustomDuration ? (
                        <a
                            className={styles.resetDurationInput}
                            href={window.location.pathname}
                            onClick={handleReset}
                            title={`Reset duration to ${
                                DEFAULT_DURATION / 1000
                            }s`}
                        >
                            Reset
                        </a>
                    ) : null}
                </div>
                <input
                    id="duration"
                    type="number"
                    className={styles.input}
                    value={Math.floor(duration / 1000)}
                    onChange={handleUpdateDuration}
                />
            </div>

            <div className={styles.timerRow}>
                {Object.entries(outputStrings).map(
                    ([key, { label, value }]) => (
                        <div className={styles.timerItem} key={key}>
                            <div className={styles.timerItemLabel}>{label}</div>
                            <div className={styles.timerItemValue}>{value}</div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Timer;
