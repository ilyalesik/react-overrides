import React from "react";
import { getComponents } from "react-overrides";

const Comp = props => {
  if (typeof Comp1OverridesReplacement === "undefined") var Comp1OverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.component || Comp1;
  if (typeof Comp1OverridesReplacement === "undefined") var Comp1OverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.component || Comp1;
  return <div>
            <Comp1OverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.props || {}} arg={1} />
            <Comp1OverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.props || {}} arg={2} />
        </div>;
};
