// @flow

export type TOverridesType<T> = {
    [T]: { component?: React$ComponentType<any>, props?: { [string]: mixed } }
};
