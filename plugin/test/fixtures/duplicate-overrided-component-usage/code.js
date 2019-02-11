import React from "react";
import o, { getComponents } from "react-overrides";

const Comp = props => {
    return (
        <div>
            <Comp1 {...o} arg={1} />
            <Comp1 {...o} arg={2} />
        </div>
    );
};
