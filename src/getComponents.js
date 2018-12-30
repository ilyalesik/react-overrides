// @flow
import * as React from "react";

export type TOverridesType<T> = {
    [T]: { component?: React.ComponentType<any>, style?: { [string]: string }, props?: { [string]: mixed } }
};

export function getComponents<T>(
    defaultComponents: { [T]: React.ComponentType<any> },
    overrides: TOverridesType<T>
): { [T]: { component: React.ComponentType<any>, props?: { string: mixed } } } {
    return Object.keys(defaultComponents).reduce((components, name) => {
        const override = overrides[name] || {};
        return {
            ...components,
            [name]: {
                component: override.component || defaultComponents[name],
                props: { ...override.props }
            }
        };
    }, {});
}
