import React from "react";
import o, { getComponents } from "react-overrides";

const Comp =  function(props) {
    return (
        <div>
            <Comp1 {...o} arg={1} />
        </div>
    );
};
