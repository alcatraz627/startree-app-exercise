import React, { useState, useEffect, useRef } from "react";
import { format, addMilliseconds } from "date-fns";
import { useSearchParams } from "react-router-dom";

import { useStore } from "../../../data/index";

import styles from "./timer.scss";
import commonStyles from "../../../styles/common.scss";

import {
    DEFAULT_DURATION,
    DATE_FORMAT,
    MAX_SECONDS_IN_A_DAY,
} from "../../../constants";

interface ITimeValues {
    endTime: number;
    duration: number;
}

const getStartTime = ({ endTime, duration }: ITimeValues) =>
    addMilliseconds(endTime, -1 * duration).valueOf();

const timezoneOffset = new Date().getTimezoneOffset() * 1000 * 60;

const getOutputData = ({
    duration,
    endTime,
    isCustomDuration,
}: ITimeValues & { isCustomDuration: boolean }) => ({
    startTime: {
        label: "Start Time",
        value: format(getStartTime({ duration, endTime }), DATE_FORMAT),
        raw: getStartTime({ duration, endTime }) - timezoneOffset,
    },
    duration: {
        label: `Duration${isCustomDuration ? " (custom)" : "(default)"}`,
        value: format(duration + timezoneOffset, DATE_FORMAT),
        raw: duration,
    },
    endTime: {
        label: "End Time",
        value: format(endTime, DATE_FORMAT),
        raw: endTime - timezoneOffset,
    },
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

    const isCustomDuration: boolean = duration !== DEFAULT_DURATION;

    const outputStrings = getOutputData({
        duration,
        endTime,
        isCustomDuration,
    });

    const updateEndTime = (): void => {
        setEndTime(Date.now());
    };

    const updateSearchParams = ({
        duration: durationProp,
        endTime: endTimeProp,
    }: ITimeValues) => {
        setSearchParams({
            startTime: `${getStartTime({
                endTime: endTimeProp,
                duration: durationProp,
            })}`,
            duration: `${durationProp}`,
            endTime: `${endTimeProp}`,
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

    const handleResetDuration = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        setDuration(DEFAULT_DURATION);

        return false;
    };

    // Initialise the timer when the component mounts and clean it up when the component unmounts
    useEffect(() => {
        updateSearchParams({
            duration,
            endTime,
        });

        timer.current = setInterval(() => {
            updateEndTime();
        }, 1000);

        return () => {
            if (typeof timer.current === "number") {
                clearInterval(timer.current);
                timer.current = null;
            }
        };
    }, []);

    // Update the url params correspondingly whenever the state values change
    useEffect(() => {
        updateSearchParams({
            duration,
            endTime,
        });
    }, [duration, endTime]);

    const CustomDurationButton = ({ style = "" }: { style: string }) =>
        isCustomDuration ? (
            <a
                className={`${styles.resetDurationInput} ${style}`}
                href={window.location.pathname}
                onClick={handleResetDuration}
                title={`Reset duration to ${DEFAULT_DURATION / 1000}s`}
            >
                Reset Duration
            </a>
        ) : null;

    return (
        <div className={styles.root}>
            <div className={styles.title}>Timer</div>

            <div className={styles.inputContainer}>
                <div className={styles.beforeInput}>
                    <label className={styles.inputLabel} htmlFor="duration">
                        Enter a duration (in seconds)
                    </label>
                    <CustomDurationButton style={commonStyles.onlyDesktop} />
                </div>
                <input
                    id="duration"
                    type="number"
                    className={styles.input}
                    value={Math.floor(duration / 1000)}
                    onChange={handleUpdateDuration}
                />
                <CustomDurationButton style={commonStyles.onlyMobile} />
                <label className={styles.inputLabel} htmlFor="duration">
                    Maximum allowed value is {MAX_SECONDS_IN_A_DAY / 1000}s (23h
                    59m 59s)
                </label>
            </div>

            <div className={styles.timerRow}>
                {Object.entries(outputStrings).map(
                    ([key, { label, value, raw }]) => (
                        <div className={styles.timerItem} key={key}>
                            <div className={styles.timerItemLabel}>{label}</div>
                            <div className={styles.timerItemValue}>{value}</div>
                            <div className={styles.timerItemLabel}>
                                [
                                {Math.floor(raw / 1000) %
                                    (MAX_SECONDS_IN_A_DAY / 1000 + 1)}
                                s]
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Timer;
