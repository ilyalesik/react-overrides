# react-overrides

This library inspired by article 
[Better Reusable React Components with the Overrides Pattern](https://medium.com/@dschnr/better-reusable-react-components-with-the-overrides-pattern-9eca2339f646).

## Installation

Install it with yarn:

```
yarn add react-overrides
```

Or with npm:

```
npm i react-overrides --save
```

## Usage
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
