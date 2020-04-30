import React from "react";
import { connect } from "react-redux";
import Table from "../Table";
import { InterfaceStore } from "../../redux/reducers";
import { TypeCell } from "../Cells";
import { endGame } from "../../redux/actions";

interface InterfacePropsGrid {
    data: [number[]];
    xSummary: number[];
    ySummary: number[];
    dimension: number;
}

interface InterfaceDispatchGrid {
    endGame: () => void;
}

interface InterfaceState {
    cells: CellsGrid;
    ready: boolean;
    gameStarted: boolean,
}

type CalculateSummary = [boolean, boolean];

export type CellsGrid = Array<Array<TypeCell>>;

class Grid extends React.Component<
    InterfacePropsGrid & InterfaceDispatchGrid,
    InterfaceState
> {
    constructor(props: InterfacePropsGrid & InterfaceDispatchGrid) {
        super(props);

        const cellsDimension: number = this.props.dimension + 2;

        this.state = {
            cells: Array(cellsDimension).fill(
                Array(cellsDimension).fill(
                    {} as TypeCell,
                    0,
                    cellsDimension + 2,
                ),
                0,
                cellsDimension + 2,
            ),
            gameStarted: false,
            ready: false,
        };
    }

    private calculateSumms(cellY: number, cellX: number, cells: CellsGrid): CalculateSummary {
        const { dimension, xSummary, ySummary } = this.props;
        const currentRowSum: number = ySummary[cellY - 1];
        const currentColSum: number = xSummary[cellX - 1];

        let tempRowSum: number = 0, tempColSum: number = 0;

        for ( let i = 1; i <= dimension; i++ ) {
            if ( cells[cellY][i].class === "non-clicked" ) {
                tempRowSum += cells[cellY][i].text;
            }

            if ( cells[i][cellX].class === "non-clicked" ) {
                tempColSum += cells[i][cellX].text;
            }
        }

        return [tempRowSum === currentRowSum, tempColSum === currentColSum];
    }

    private cellClickHandler(row: number, col: number) {
        const { cells, gameStarted } = this.state;
        const { dimension } = this.props;

        cells[row][col] = {
            ...cells[row][col],
            class:
                cells[row][col].class === "clicked" ? "non-clicked" : "clicked",
        };

        const [ rowSummEqual, colSummEqual ]: CalculateSummary = this.calculateSumms(row, col, cells);

        cells[row][0] = {
            ...cells[row][0],
            correct: rowSummEqual,
        };

        cells[row][dimension + 1] = {
            ...cells[row][dimension + 1],
            correct: rowSummEqual,
        };

        cells[0][col] = {
            ...cells[0][col],
            correct: colSummEqual,
        };
        cells[dimension + 1][col] = {
            ...cells[dimension + 1][col],
            correct: colSummEqual,
        };

        if ( ! gameStarted ) {
            this.setState({
                ...this.state,
                gameStarted: true,
                cells: [...cells],
            });
        } else {
            this.setState({
                ...this.state,
                cells: [...cells],
            });
        }
    }

    componentDidUpdate() {
        if ( ! this.state.gameStarted ) {
            return;
        }

        const { cells } = this.state;
        const { dimension } = this.props;
        let closedRowsCount: number = 0;
        let closedColsCount: number = 0;

        for ( let i = 1; i <= dimension; i++ ) {
            if ( cells[0][i].correct ) {
                closedRowsCount++;
            }

            if ( cells[i][0].correct ) {
                closedColsCount++;
            }
        }

        if ( dimension === closedColsCount && dimension === closedRowsCount ) {
            this.props.endGame();
        }
    }

    componentDidMount() {
        const { data, ySummary, xSummary, dimension } = this.props;
        const tempCells = [] as CellsGrid;
        const rowSummary = [
            {
                text: -1,
                type: "empty",
                correct: false,
            },
            ...xSummary.map((elem) => ({
                text: elem,
                type: "summary",
                correct: false,
            })),
            {
                text: -1,
                type: "empty",
                correct: false,
            },
        ] as TypeCell[];

        data.forEach((row: number[], rowIndex: number): void => {
            if (0 === rowIndex) {
                tempCells.push(rowSummary);
            }

            tempCells.push([
                {
                    text: ySummary[rowIndex],
                    type: "summary",
                    correct: false,
                },
                ...row.map((cell: number, cellIndex: number) => ({
                    text: cell,
                    type: "interactive",
                    class: "non-clicked",
                    clickHandler: this.cellClickHandler.bind(
                        this,
                        rowIndex + 1,
                        cellIndex + 1,
                    ),
                })),
                {
                    text: ySummary[rowIndex],
                    type: "summary",
                    correct: false,
                },
            ] as TypeCell[]);

            if (dimension - 1 === rowIndex) {
                tempCells.push(rowSummary);
            }
        });

        this.setState({
            ready: true,
            cells: tempCells,
        });
    }

    render() {
        const { ready } = this.state;
        return (
            <div className="grid">
                {ready ? <Table data={this.state.cells} /> : <h1>Preparing</h1>}
            </div>
        );
    }
}

function mapStateToProps(state: InterfaceStore) {
    return {
        data: state.fulfilledGrid,
        xSummary: state.xSummary,
        ySummary: state.ySummary,
        dimension: state.dimension,
    };
}

function mapDispathToProps(dispath: any): InterfaceDispatchGrid {
    return {
        endGame: () => dispath(endGame()),
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Grid);
