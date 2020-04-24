import React from "react";
import TableRow from "./TableRow";

interface InterfaceTable {
    data: Array<Array<React.ReactNode>>;
}

function Table({ data }: InterfaceTable) {
    return (data.length ? <table>
        <tbody>
            {data.map((item, index: number) => (
                <TableRow key={`row-${index}`} data={item} />
            ))}
        </tbody>
    </table> : null);
}

export default Table;
