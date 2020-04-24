import React, { useEffect } from "react";
import { connect } from "react-redux";
import { InterfaceStore } from "../../redux/reducers";
import { AppReadyState } from "../../redux/reducers";
import gridGenerator from "../../core/gridGenerator";
import { changeReadyState, dataReady } from "../../redux/actions";

interface InterfacePropsApp {
    dimension: number;
    readyState: AppReadyState;
}

interface ReadyData {
    generatedGrid: any,
    fulfilledGrid: any,
}

interface InterfaceDispathApp {
    changeReadyState: (s: AppReadyState) => void;
    dataReady: (s: ReadyData) => void;
}

function Loader({
    dimension,
    readyState,
    changeReadyState,
    dataReady
}: InterfacePropsApp & InterfaceDispathApp) {
    useEffect(() => {
        if ("loading" === readyState) {
            setTimeout(() => {
                changeReadyState("generate");
            }, 3000);
        } else if ("generate" === readyState) {
            setTimeout(() => {
                const [correctGrid, fulfilledGrid] = gridGenerator(dimension);
                dataReady({
                    generatedGrid: correctGrid,
                    fulfilledGrid: fulfilledGrid,
                } );
            }, 3000);
        }
    }, [readyState, dimension, changeReadyState, dataReady]);

    return ("loading" === readyState ? <h1>Loading</h1> : <h1>Generate</h1>);
}

function mapStateToProps(state: InterfaceStore) {
    return {
        dimension: state.dimension,
        readyState: state.readyState,
    };
}

function mapDispathToProps(dispath: any) {
    return {
        changeReadyState: (readyStateString: AppReadyState) =>
            dispath(changeReadyState(readyStateString)),
        dataReady: (data: ReadyData) => dispath(dataReady(data)),
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Loader);
