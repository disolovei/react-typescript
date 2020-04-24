import React from "react";
import { connect } from "react-redux";
import Table from "../Table";
import Button from "../Button";
import { InterfaceStore } from "../../redux/reducers";
import { markCell, unMarkCell } from "../../redux/actions";

interface InterfacePropsGrid {
    data: [number[]];
}

interface InterfaceDispatchGrid {
    markCell: (x: number, y: number) => void;
    unMarkCell: (x: number, y: number) => void;
}

function Grid({ data }: InterfacePropsGrid & React.HTMLAttributes<HTMLButtonElement>) {
    const clickHandler = function(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(e.currentTarget);
    };

    const prepareCells = data.map((row: number[], xCoordinate: number) =>
        row.map((cell: number, yCoordinate: number) => (
            <Button
                className="cell"
                onClick={clickHandler}
                data-x={xCoordinate}
                data-y={yCoordinate}
            >
                {cell}
            </Button>
        )),
    );

    return (
        <div className="grid">
            <Table data={prepareCells} />
        </div>
    );
}

function mapStateToProps(state: InterfaceStore) {
    return {
        data: state.fulfilledGrid,
    };
}

function mapDispathToProps(dispath: any): InterfaceDispatchGrid {
    return {
        markCell: (x: number, y: number) => dispath(markCell({ x, y })),
        unMarkCell: (x: number, y: number) => dispath(unMarkCell({ x, y })),
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Grid);
