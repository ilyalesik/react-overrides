import React from "react";
import { getComponents } from "react-overrides";

const OverridableButton = props => {
  const Container = ButtonContainer;
  const Text = Buttons;

  const Icon = () => null;

  const ContainerOverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Container && props.overrides.Container.component || Container;
  const IconOverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Icon && props.overrides.Icon.component || Icon;
  const TextOverridesReplacement = typeof props !== "undefined" && props.overrides && props.overrides.Text && props.overrides.Text.component || Text;
  return <ContainerOverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Container && props.overrides.Container.props || {}} as="button">
            <IconOverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Icon && props.overrides.Icon.props || {}} />
            <TextOverridesReplacement {...typeof props !== "undefined" && props.overrides && props.overrides.Text && props.overrides.Text.props || {}}>{props.children}</TextOverridesReplacement>
        </ContainerOverridesReplacement>;
};
