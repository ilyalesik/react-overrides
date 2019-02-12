# react-overrides
Helper for create extendable components. 
Intended to override the props and used components of the internal elements of the component.

Inspired by article 
[Better Reusable React Components with the Overrides Pattern](https://medium.com/@dschnr/better-reusable-react-components-with-the-overrides-pattern-9eca2339f646).

## Installation

Install core package and babel plugin with yarn:

```
yarn add react-overrides
yarn add babel-plugin-react-overrides --dev
```

Or with npm:

```
npm i react-overrides --save
npm i babel-plugin-react-overrides --save-dev
```

Further, add `react-overrides` to your `.babelrc` configuration:
```json
{
  "plugins": ["babel-plugin-react-overrides"]
}
```

## Usage

Create extendable component by passing the default export 
from `react-overrides` package to the component to be extended. 

*Example*:

```javascript
import React, {useState} from "react";
import o from "react-overrides";
import {Container, Value, OptionsContainer, Option} from "...";

export const Select = (props) => {
    const {opened, setOpened} = useState(false);
    
    return <Container {...o} onClick={() => setOpened(!opened)}>
        <Value {...o}>{props.currentValue}</Value>
        {opened && <OptionsContainer {...o}>
            {props.values.map(({label, id}) => (
                <Option {...o} onClick={() => props.onSelect(id)} key={id}>{label}</Option>
            ))}
        </OptionsContainer>}
    </Container>
};
```

Extend with component through passing props of internal component:
```javascript
import React from "react";
import {Select} from "./Select"

const BigOptionSelect = (props) => {
    return <Select {...props} overrides={{
        Option: {
            props: {
                className: "big-option-select__option",
                "aria-role": "button"
            }
        }
    }} />
}
```

You can replace the internal component with a custom one:
```javascript
import React from "react";
import {Select} from "./Select"
import {FancyGrid} from "./fancy-grid";

const FancyGridSelect = (props) => {
    return <Select {...props} overrides={{
        OptionsContainer: {
            component: FancyGrid
        }
    }} />
}
```

#### Access to individual props

```javascript
import React from "react";
import o from "react-overrides";
import c from "classnames";
import "./button.scss";

const Button = props => {
    const Container = (props) => <button {...props) />;
    const Text = (props) => <span {...props) />;
    
    return (
        <Container {...o} className={c("button", o.className)} onClick={props.onClick}>
            <Text className={c("button__text", o.className)} />
                {props.children}
            </Text>
        </Input>
    );
};
```

## How it works
`babel-plugin-react-overrides` transforms the code from the example into this:
```javascript
import React, { useState } from "react";
import { Container, Value, OptionsContainer, Option } from "...";
export const Select = props => {
  const {
    opened,
    setOpened
  } = useState(false);
  const overridableProps = typeof props !== "undefined" ? props : this && typeof this.props !== "undefined" ? this.props : arguments[0];
  const overridableComponents = {
    Container: typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.Container && overridableProps.overrides.Container.component || Container,
    Value: typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.Value && overridableProps.overrides.Value.component || Value,
    OptionsContainer: typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.OptionsContainer && overridableProps.overrides.OptionsContainer.component || OptionsContainer,
    Option: typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.Option && overridableProps.overrides.Option.component || Option
  };
  return <overridableComponents.Container {...typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.Container && overridableProps.overrides.Container.props || {}} onClick={() => setOpened(!opened)}>
        <overridableComponents.Value {...typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.Value && overridableProps.overrides.Value.props || {}}>{props.currentValue}</overridableComponents.Value>
        {opened && <overridableComponents.OptionsContainer {...typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.OptionsContainer && overridableProps.overrides.OptionsContainer.props || {}}>
            {props.values.map(({
        label,
        id
      }) => <overridableComponents.Option {...typeof overridableProps !== "undefined" && overridableProps.overrides && overridableProps.overrides.Option && overridableProps.overrides.Option.props || {}} onClick={() => props.onSelect(id)} key={id}>{label}</overridableComponents.Option>)}
        </overridableComponents.OptionsContainer>}
    </overridableComponents.Container>;
};

```


### Usage without babel plugin

Create reusable component with *getComponents*: 
```javascript
import React, {useState} from "react";
import { getComponents } from "react-overrides";
import c from "classnames";

export const Select = (props) => {
    const {opened, setOpened} = useState(false);
    
    const {
        Container: { component: Container, props: containerProps },
        Value: { component: Value, props: valueProps },
        Option: { component: Option, optionProps },
        OptionsContainer: { component: OptionsContainer, optionsContainerProps }
    } = getComponents(
        {
            Container: (props) => <div {...props} className={c("select", props.className)} />,
            Value: (props) => <span {...props} className={c("select__value", props.className)} />,
            Option: (props) => <li {...props} className={c("select__option", props.className)} />,
            OptionsContainer: (props) => <ul {...props} className={c("select__options-container", props.className)} />,
        },
        props.overrides
    );
    
    return <Container {...containerProps} onClick={() => setOpened(!opened)}>
        <Value {...valueProps}>{props.currentValue}</Value>
        {opened && <OptionsContainer {...optionsContainerProps}>
            {props.values.map(({label, id}) => (
                <Option {...optionProps} onClick={() => props.onSelect(id)} key={id}>{label}</Option>
            ))}
        </OptionsContainer>}
    </Container>
};
```
