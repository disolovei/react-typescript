import fill from "lodash/fill";

function getRandomInt(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function throwCoin(): boolean {
    return Math.random() > 0.5;
}

export default function (dimension: number): [number[][], number[][]] {
    const result = fill(Array(dimension), [] as number[]);
    const fulfilled = fill(Array(dimension), [] as number[]);

    for (let y = 0; y < dimension; y++) {
        result[y] = fill(Array(dimension), 0);
        fulfilled[y] = fill(Array(dimension), 0);

        for (let x = 0; x < dimension; x++) {
            if (throwCoin()) {
                result[y][x] = fulfilled[y][x] = getRandomInt(20);
            } else {
                fulfilled[y][x] = getRandomInt(20);
            }
        }
    }

    return [result, fulfilled];
}
