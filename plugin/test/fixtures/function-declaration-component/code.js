import React from "react";
import o, { getComponents } from "react-overrides";

function Comp(props) {
    return (
        <div>
            <Comp1 {...o} arg={1} />
        </div>
    );
};
