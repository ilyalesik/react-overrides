import React from "react";

const Comp = props => {
  const Comp1OverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.component || Comp1;
  return <div>
        <Comp1OverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.props || {}} />
    </div>;
};
