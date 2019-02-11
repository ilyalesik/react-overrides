import React from "react";
import { getComponents } from "react-overrides";

const Comp = props => {
  if (typeof Comp1OverridesReplacement === "undefined") var Comp1OverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.component || Comp1;
  if (typeof Comp2OverridesReplacement === "undefined") var Comp2OverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Comp2 && props.overrides.Comp2.component || Comp2;
  return <div>
            <Comp1OverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.props || {}} arg={1} />
            <Comp2OverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Comp2 && props.overrides.Comp2.props || {}} />
        </div>;
};
