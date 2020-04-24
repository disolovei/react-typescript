import React from "react";

function TableCell({ children, ...attrs }:React.HTMLAttributes<HTMLTableCellElement>) {
return <td{...attrs}>{children}</td>;
}

export default TableCell;