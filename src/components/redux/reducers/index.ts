import {
    CHANGE_READY_STATE,
    DATA_READY,
    END_GAME
} from "../actionTypes";
import { Action } from "../actions";
import calculateSummary from "../../core/calculateSummary";

export type AppReadyState = "loading" | "generate" | "render";

export type Grid = [number[]];

export interface InterfaceStore {
    level: number;
    dimension: number;
    readonly allowedLevels: string[];
    generatedGrid: Grid;
    fulfilledGrid: Grid;
    readonly readyState: AppReadyState;
    ySummary: number[];
    xSummary: number[];
}

const initialState: InterfaceStore = {
    level: 1,
    dimension: 5,
    allowedLevels: ["on, two", "three"],
    generatedGrid: [[]],
    fulfilledGrid: [[]],
    readyState: "loading",
    ySummary: [],
    xSummary: [],
};

export default (state: InterfaceStore = initialState, action: Action) => {
    switch (action.type) {
        case CHANGE_READY_STATE:
            return {
                ...state,
                readyState: action.payload,
            };
        case END_GAME:
            console.log("END GAME");
            return {
                ...initialState,
            };
        case DATA_READY:
            const newReadyState = "render" as AppReadyState;
            const { generatedGrid, fulfilledGrid } = action.payload;
            const [ySummary, xSummary] = calculateSummary(generatedGrid);
            return {
                ...state,
                readyState: newReadyState,
                fulfilledGrid,
                generatedGrid,
                ySummary,
                xSummary,
            };
        default:
            return state;
    }
};
