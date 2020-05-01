import React from "react";
import TableRow from "./TableRow";
import { CellsGrid } from "../Grid";

interface InterfaceTable {
    data: CellsGrid;
}

function Table({ data }: InterfaceTable) {
    return data.length ? (
        <table>
            <tbody>
                {data.map((item, index: number) => (
                    <TableRow key={`row-${index}`} data={item} />
                ))}
            </tbody>
        </table>
    ) : null;
}

export default Table;
