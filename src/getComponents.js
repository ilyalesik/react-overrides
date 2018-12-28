// @flow
import * as React from "react";

export type TOverridesType<T> = {
    [T]: { component?: React.ComponentType<any>, style?: { [string]: string }, props?: { [string]: mixed } }
};

export function getComponents<T>(
    defaultComponents: { [T]: React.ComponentType<any> },
    overrides: TOverridesType<T>
): { [T]: { component: React.ComponentType<any>, props?: { string: mixed } } } {
    return Object.keys(defaultComponents).reduce((acc, name) => {
        const override = overrides[name] || {};
        acc[name] = {
            component: override.component || defaultComponents[name],
            props: { $style: override.style, ...override.props }
        };
        return acc;
    }, {});
}
