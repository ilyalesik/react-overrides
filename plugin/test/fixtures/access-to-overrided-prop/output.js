import React from "react";

const Comp = props => {
  const Comp1OverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.component || Comp1;
  const Comp1OverridesReplacementOverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Comp1OverridesReplacement && props.overrides.Comp1OverridesReplacement.component || Comp1OverridesReplacement;
  return <div>
            <Comp1OverridesReplacementOverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.props || {}} className={"comp1 " + (typeof props !== "undefined" && props.overrides && props.overrides.Comp1OverridesReplacement && props.overrides.Comp1OverridesReplacement.props || {}).className} />
        </div>;
};
