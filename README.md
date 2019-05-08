# react-overrides

[![Build Status](https://travis-ci.org/ilyalesik/react-overrides.svg?branch=master)](https://travis-ci.org/ilyalesik/react-overrides)
[![npm version](https://img.shields.io/npm/v/react-overrides.svg)](https://www.npmjs.com/package/react-overrides)
[![npm downloads](https://img.shields.io/npm/dt/react-overrides.svg)](https://www.npmjs.com/package/react-overrides)

Let's create `CommonButton` component with `react-overrides`:
```javascript
import o from "react-overrides";

export const CommonButton = props => (
    <Container {...o} onClick={props.onClick}>
        <Text {...o}>{props.children}</Text>
    </Container>
);
```

Next, we can pass props to internal elements of `CommonButton` by passing `overrides` prop:
```javascript
export const LinkButton = props => (
  <CommonButton
    {...props}
    overrides={{
      Container: { // 'Container' element of CommonButton
        props: {
          as: "a", // say the component to display itself as <a> tag. Typical for CSS-in-JS solutions.
          href: props.href // add href attribute to element
        }
      }
    }}
  />
);
```
So we extend the `CommonButton` by creating a `LinkButton` that has *link* behavior.

Try at CodeSandbox:

[![Edit react-overrides](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n8m65940l)


It is also possible to replace the entire component:
```javascript
export const LinkButton = props => (
  <CommonButton
    {...props}
    overrides={{
      Text: {
          component: BigText
      }
    }}
  />
);
```

<a href="https://lessmess.agency/?utm_source=react-overrides">
  <img src="https://lessmess.agency/badges/sponsored_by_lessmess.svg"
       alt="Sponsored by Lessmess" width="236" height="54">
</a>


## Motivation

There is a need for pass props directly to elements, or replace his component. 
Here's some examples of when you need it:
* You create UI library, and want to provide wide customization abilities for components. [Base UI](https://baseui.design/) library used this approach.
* You need *unified* way to pass any props (for example, ARIA attributes) to elements of components. 
* Your components can have many internal elements and it can be inconvenient to add a prop to component every time you just need to forward the prop to an internal element.

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
            {/* For access to individual prop used o().<prop>, o.<prop> throw Flow error */}
            <Option {...o} a={1} b={o().b || "x"} />
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

Thanks [@ai](https://github.com/ai) for review the documentation.
