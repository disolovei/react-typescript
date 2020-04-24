import { CHANGE_READY_STATE, DATA_READY } from "../actionTypes";
import { Action } from "../actions";

export type AppReadyState = "loading" | "generate" | "render";

export type Grid = [number[]];

export interface InterfaceStore {
    level: number;
    dimension: number;
    allowedLevels: string[];
    generatedGrid: Grid;
    fulfilledGrid: Grid;
    readyState: AppReadyState;
}

const initialState: InterfaceStore = {
    level: 1,
    dimension: 5,
    allowedLevels: ["on, two", "three"],
    generatedGrid: [[]],
    fulfilledGrid: [[]],
    readyState: "loading",
};

export default (state: InterfaceStore = initialState, action: Action) => {
    switch (action.type) {
        case CHANGE_READY_STATE:
            return {
                ...state,
                readyState: action.payload,
            };
        case DATA_READY:
            let newReadyState: AppReadyState = "render"; // WTF
            return {
                ...state,
                readyState: newReadyState,
                fulfilledGrid: action.payload.fulfilledGrid,
                generatedGrid: action.payload.generatedGrid,
            };
        default:
            return state;
    }
};
