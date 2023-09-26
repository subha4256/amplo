import React from "react";
import { useDrop, useDrag } from "react-dnd";

const ProcessIndepHOC = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: "independent" },
        begin: () => ({
            IndependenProcessName: name,
            IndependentDecompositionProcessLevel1ID: id,
        }),
    });

    return (
        <div ref={dragRef}>
            <p className="capability-list">{name}</p>
        </div>
    );
};

export default ProcessIndepHOC;
