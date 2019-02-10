import React from "react";

const Select = props => {
  const ContainerOverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Container && props.overrides.Container.component || Container;
  return <ContainerOverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Container && props.overrides.Container.props || {}}>
            {props.options.map((option, key) => {
      const OptionOverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Option && props.overrides.Option.component || Option;
      return <OptionOverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Option && props.overrides.Option.props || {}} key={key} title={option.title} />;
    })}
        </ContainerOverridesReplacement>;
};
