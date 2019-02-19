// @flow
import * as React from "react";
import o, { type ExtractOverridesProps } from "..";

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

/**
 * $ExpectError
 * Pass prop wrong prop value
 */
const SelectWrongProp = (props: { overrides: TOverridesProps }) => <Option {...o} a={3} b={"x"} />;

const OverridedSelect = () => {
    return (
        <Select
            overrides={{
                Option: {
                    props: {
                        a: 1,
                        b: "1"
                    }
                },
                Container: {
                    props: {}
                }
            }}
        />
    );
};

const OverridedSelectPartialProps = () => {
    return (
        <Select
            overrides={{
                Option: {
                    props: {
                        a: 1
                    }
                },
                Container: {
                    props: {}
                }
            }}
        />
    );
};

const OverridedSelectPartialComponents = () => {
    return (
        <Select
            overrides={{
                Option: {
                    props: {
                        a: 1
                    }
                }
            }}
        />
    );
};

/**
 * $ExpectError
 * prettier-ignore
 * Pass prop wrong prop value
 */
const OverridedWrongProp = () => <Select overrides={{ Option: {props: {a: 3, b: "1"}}}} />;


const NewOption = (props: { a: 1 | 2, b: string }) => {
    return <div>{"new" + props.b + 4 * props.a}</div>;
};

const OverridedSelectNewComponent = () => {
    return (
        <Select
            overrides={{
                Option: {
                    component: NewOption
                }
            }}
        />
    );
};

const NewOptionPartial = (props: { b: number | string }) => {
    return <div>{"new" + props.b}</div>;
};

const OverridedNewComponentPartial = () => <Select overrides={{ Option: {component: NewOptionPartial}}} />;

/**
 * $ExpectError
 * prettier-ignore
 * Pass incompatible component
 */
const Option11 = (props: { a: 1 | 2, b: string }) => {
    return <div>{props.b + 2 * props.a}</div>;
};

const Container11 = (props: { children?: React.Node }) => {
    return <div>{props.children}</div>;
};

const OverridableProps11 = {
    Option11,
    Container11
};
type TOverridesProps11 = ExtractOverridesProps<typeof OverridableProps11>;

const Select11 = (props: { overrides: TOverridesProps11 }) => {
    return (
        <Container>
            <Option a={1} b={"x"} />
        </Container>
    );
};

const NewOptionWrong = (props: { b: number }) => {
    return <div>{"new" + props.b}</div>;
};


const OverridedNewComponentWrong = () => <Select11 overrides={{ Option11: {component: NewOptionWrong}}} />;

/**
 * $ExpectError
 * prettier-ignore
 * Pass incompatible component
 */
const Option22 = (props: { a: 1 | 2, b: string }) => {
    return <div>{props.b + 2 * props.a}</div>;
};

const Container22 = (props: { children?: React.Node }) => {
    return <div>{props.children}</div>;
};

const OverridableProps22 = {
    Option22,
    Container22
};
type TOverridesProps22 = ExtractOverridesProps<typeof OverridableProps22>;

const Select22 = (props: { overrides: TOverridesProps22 }) => {
    return (
        <Container>
            <Option a={1} b={"x"} />
        </Container>
    );
};

const NewOptionWrongExtra = (props: { a: 1 | 2, b: string, c: string }) => {
    return <div>{"new" + props.b}</div>;
};


const OverridedNewComponentWrongExtra = () => <Select22 overrides={{ Option22: {component: NewOptionWrong}}} />;
