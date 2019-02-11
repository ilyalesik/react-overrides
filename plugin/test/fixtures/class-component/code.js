import React from "react";
import o, { getComponents } from "react-overrides";

class Comp extends React.PureComponent{
    render() {
        return (
            <div>
                <Comp1 {...o} arg={1} />
            </div>
        );
    }
}
