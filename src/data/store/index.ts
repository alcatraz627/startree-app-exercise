import create from "zustand";

import { DEFAULT_DURATION } from "../../constants";

export interface AppStore {
    duration: number;
    endTime: number;
    setDuration: (newDuration: number) => void;
    setEndTime: (newEndTime: number) => void;
}

const useStore = create<AppStore>()((set) => ({
    duration: DEFAULT_DURATION,
    endTime: Date.now(),
    setDuration: (newDuration) => set({ duration: newDuration }),
    setEndTime: (newEndTime) => set({ endTime: newEndTime }),
}));

export default useStore;
