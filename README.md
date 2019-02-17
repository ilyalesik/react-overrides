# 🔮 react-overrides
Pass props to internal elements of React component by passing `overrides` prop. 
```javascript
export const PrimaryButton = props => (
  <CommonButton
    {...props}
    overrides={{
      Container: {
        props: {
          className: "primary_button__container",
          "aria-role": "button"
        }
      },
      Text: {
        props: {
          className: "primary_button__text"
        }
      }
    }}
  />
);
```
Where `CommonButton` was made with `react-overrides`:
```javascript
import o from "react-overrides";

export const CommonButton = props => (
    <Container {...o} onClick={props.onClick}>
        <Text {...o}>{props.children}</Text>
    </Container>
);
```


Try at CodeSandbox:

[![Edit react-overrides](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n8m65940l)



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

#### Replace internal components

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

#### Flow support
You can use `ExtractOverrides` type props helper for infer overrides prop type from components types.
```javascript
// @flow
import * as React from "react";
import o, { type ExtractOverridesProps } from "react-overrides";

const Option = (props: { a: 1 | 2, b: string }) => {
    return <div>{props.b + 2 * props.a}</div>;
};

const Container = (props: { children?: React.Node }) => {
    return <div>{props.children}</div>;
};

const OverridableProps = {
    Option,
    Container
};
type TOverridesProps = ExtractOverridesProps<typeof OverridableProps>;

const Select = (props: { overrides: TOverridesProps }) => {
    return (
        <Container {...o}>
            <Option {...o} a={1} b={"x"} />
        </Container>
    );
};

const OverridedSelect = () => {
    return (
        <Select
            overrides={{
                Option: {
                    props: {
                        a: 1,
                    }
                }
            }}
        />
    );
};

// throw flow error:
const OverridedSelectWrong = () => {
    return (
        <Select
            overrides={{
                Option: {
                    props: {
                        a: 3
                    }
                }
            }}
        />
    );
};
```

# Acknowledgements
This library inspired by article 
[Better Reusable React Components with the Overrides Pattern](https://medium.com/@dschnr/better-reusable-react-components-with-the-overrides-pattern-9eca2339f646).
