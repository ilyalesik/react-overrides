// @flow

type ExtractPropsType = <C>(
    Component: C
) => {|
    props?: { ...$Shape<React$ElementConfig<C>> },
    component?: React$ComponentType<{ ...$Exact<React$ElementConfig<C>> }>
|};

type Extend = { [key: string]: React$ComponentType<*> };

declare function getProps<O: Extend>(components: O): $Shape<$ObjMap<O, ExtractPropsType>>;

export type ExtractOverridesProps<T: Extend> = $Call<typeof getProps, T>;
