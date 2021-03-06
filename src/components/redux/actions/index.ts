import * as actions from "../actionTypes";
import { AppReadyState } from "../reducers";

interface ReadyData {
    generatedGrid: [[]];
    fulfilledGrid: [[]];
}

export interface NewGame {
    type: actions.NEW_GAME;
}

export interface RefreshGame {
    type: actions.REFRESH_GAME;
}

export interface ChangeLevel {
    type: actions.CHANGE_LEVEL;
}

export interface ChangeDimension {
    type: actions.CHANGE_DIMENSION;
}

export interface EndGame {
    type: actions.END_GAME;
}

export interface ChangeReadyState {
    type: actions.CHANGE_READY_STATE;
    payload: AppReadyState;
}

export interface DataReady {
    type: actions.DATA_READY;
    payload: ReadyData;
}

export type Action =
    | NewGame
    | RefreshGame
    | ChangeLevel
    | ChangeDimension
    | EndGame
    | ChangeReadyState
    | DataReady;

export function newGame(): NewGame {
    return {
        type: actions.NEW_GAME,
    };
}

export function refreshGame(): RefreshGame {
    return {
        type: actions.REFRESH_GAME,
    };
}

export function changeLevel(): ChangeLevel {
    return {
        type: actions.CHANGE_LEVEL,
    };
}

export function changeDimension(): ChangeDimension {
    return {
        type: actions.CHANGE_DIMENSION,
    };
}

export function endGame(): EndGame {
    return {
        type: actions.END_GAME,
    };
}

export function changeReadyState(readyState: AppReadyState): ChangeReadyState {
    return {
        type: actions.CHANGE_READY_STATE,
        payload: readyState,
    };
}

export function dataReady(data: ReadyData): DataReady {
    return {
        type: actions.DATA_READY,
        payload: data,
    };
}
