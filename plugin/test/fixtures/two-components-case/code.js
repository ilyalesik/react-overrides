import React from "react";
import o, { getComponents } from "react-overrides";

const Comp = props => {
    return (
        <div>
            <Comp1 {...o} arg={1} />
            <Comp2 {...o} />
        </div>
    );
};
