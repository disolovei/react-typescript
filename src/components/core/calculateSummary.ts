import { Grid } from "../redux/reducers";

export default (grid: Grid): [number[], number[]] => {
    const gridLength = grid.length;
    const rowSumms: number[] = Array(gridLength).fill(0, 0, gridLength);
    const colSumms: number[] = Array(gridLength).fill(0, 0, gridLength);

    grid.forEach((row:number[], yCoordinate) => {
        row.forEach((col:number, xCoordinate) => {
            rowSumms[yCoordinate] += col;
            colSumms[xCoordinate] += col;
        })
    });

    return [rowSumms, colSumms];
}