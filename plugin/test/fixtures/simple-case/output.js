import React from "react";
import o, { getComponents } from "react-overrides";

const Comp = props => {
  return <div>
            <Comp1 {...props.overrides.Comp1.props} arg={1} />
        </div>;
};
