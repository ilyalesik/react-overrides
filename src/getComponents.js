// @flow
import * as React from "react";
import type { ExtractOverridesProps } from "./ExtractOverridesProps";

export function getComponents<T: { [key: string]: React$ComponentType<*> }>(
    defaultComponents: T,
    overrides?: ExtractOverridesProps<T>
): ExtractOverridesProps<T> {
    return Object.keys(defaultComponents).reduce((components, name) => {
        const override = (overrides && overrides[name]) || {};
        return {
            ...components,
            [name]: {
                component: override.component || defaultComponents[name],
                props: { ...override.props }
            }
        };
    }, {});
}
