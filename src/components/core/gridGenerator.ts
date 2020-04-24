function getRandomInt(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function throwCoin(): boolean {
    return Math.random() > 0.5;
}

export default function (dimension: number): [number[], number[]] {
    const result = Array(dimension);
    const fulfilled = Array(dimension);

    for (let y = 0; y < dimension; y++) {
        result[y] = Array(dimension);
        fulfilled[y] = Array(dimension);

        for (let x = 0; x < dimension; x++) {
            if (throwCoin()) {
                result[y][x] = fulfilled[y][x] = getRandomInt(20);
            } else {
                result[y][x] = 0;
                fulfilled[y][x] = getRandomInt(20);
            }
        }
    }

    return [result, fulfilled];
}
