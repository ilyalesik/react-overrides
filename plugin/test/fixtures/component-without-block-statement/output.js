import React from "react";

const Comp = props => {
  const overridableProps = typeof props !== "undefined" ? props : this && typeof this.props !== "undefined" ? this.props : arguments[0];
  const overridableComponents = {
    Comp1: typeof props !== "undefined" && props.overrides && props.overrides.Comp1 && props.overrides.Comp1.component || Comp1
  };
  return <div>
        <overridableComponents.Comp1 {...typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.Comp1 && overridableProps.overrides.Comp1.props || {}} />
    </div>;
};
