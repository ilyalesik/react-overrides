import React from "react";
import o from "react-overrides";

const Comp = props => (
    <div>
        <Comp1 {...o} />
    </div>
);
