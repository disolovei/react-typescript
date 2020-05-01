import React from "react";
import Button from "../Button";

export interface TypeCell {
    text: number;
    type: "interactive" | "summary" | "empty",
    class?: "clicked" | "non-clicked" | "equal" | null;
    correct?: boolean,
    clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export interface InterfaceTableCell {
    item: TypeCell;
}

interface CellInteractive {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CellSummary({ item }: InterfaceTableCell) {
    return <span className={`cell summary ${item.correct ? "equal" : ""}`}>{item.text}</span>;
}

export function CellInteractive({ item }: InterfaceTableCell) {
    return (
        <Button className={`cell interactive ${item.class ? item.class : "non-selected"}`} onClick={item.clickHandler}>
            {item.text}
        </Button>
    );
}

export function CellEmpty() {
    return <span className="cell empty"></span>;
}

export default function Cell({item}: InterfaceTableCell) {
    if ("interactive" === item.type) {
        return <CellInteractive item={item} />;
    } else if ("summary" === item.type) {
        return <CellSummary item={item} />;
    } else {
        return <CellEmpty />;
    }
}
