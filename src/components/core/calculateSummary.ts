import fill from "lodash/fill";
import { Grid } from "../redux/reducers";

export default (grid: Grid): [number[], number[]] => {
    const gridLength = grid.length;
    const rowSumms: number[] = fill(Array(gridLength), 0);
    const colSumms: number[] = fill(Array(gridLength), 0);

    grid.forEach((row:number[], yCoordinate) => {
        row.forEach((col:number, xCoordinate) => {
            rowSumms[yCoordinate] += col;
            colSumms[xCoordinate] += col;
        })
    });

    return [rowSumms, colSumms];
}