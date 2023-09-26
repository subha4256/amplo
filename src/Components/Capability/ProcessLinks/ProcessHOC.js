import React from "react";
import { useDrop, useDrag } from "react-dnd";

const ProcessHOC = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: "dependent" },
        begin: () => ({ DependentProcessLevelName: name, DecompositionProcessLevel1ID: id }),
    });

    return (
        <div ref={dragRef}>
            <p className="capability-list">{name}</p>
        </div>
    );
};

export default ProcessHOC;
