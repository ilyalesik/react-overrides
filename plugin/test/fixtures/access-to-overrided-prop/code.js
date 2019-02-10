import React from "react";
import o from "react-overrides";

const Comp = props => {
    return (
        <div>
            <Comp1 {...o} className={"comp1 " + o.className} />
        </div>
    );
};
