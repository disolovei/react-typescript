import React from "react";
import { connect } from "react-redux";
import Grid from "./components/elements/Grid";
import { InterfaceStore } from "./components/redux/reducers";
import { AppReadyState } from "./components/redux/reducers";
import Loader from "./components/elements/Loader";

interface InterfacePropsApp {
    readyState: AppReadyState;
}

function App({ readyState }: InterfacePropsApp) {
    return (
        <div className="App">
            <header id="top-panel">Top panel</header>
            <main id="gameboard">
                {"render" === readyState ? <Grid /> : <Loader />}
            </main>
            <footer id="bottom-panel">Bottom panel</footer>
        </div>
    );
}

function mapStateToProps(state: InterfaceStore) {
    return {
        readyState: state.readyState,
    };
}

export default connect(mapStateToProps)(App);
