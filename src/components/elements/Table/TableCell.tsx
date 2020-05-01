import React from "react";
import Cell, { InterfaceTableCell } from "../Cells";

function TableCell({
    item,
    ...attrs
}: React.HTMLAttributes<HTMLTableCellElement> & InterfaceTableCell) {
    return <td {...attrs}>
        <Cell item={item}/>
    </td>;
}

export default TableCell;
