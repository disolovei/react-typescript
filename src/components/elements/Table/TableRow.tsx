import React from "react";
import TableCell from "./TableCell";

interface InterfaceTableRow {
    data: Array<{}>;
}

function TableRow({
    data,
    ...attrs
}: React.HTMLAttributes<HTMLTableRowElement> & InterfaceTableRow) {
    return (
        <tr {...attrs}>
            {data.map((item: any, index: number) => (
                <TableCell key={index} item={item} />
            ))}
        </tr>
    );
}

export default TableRow;
