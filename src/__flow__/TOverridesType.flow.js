// @flow
import React from "react";
import type { TOverridesType } from "../TOverridesType";

const Select = (props: { overrides: TOverridesType<"Container" | "Option"> }) => {
    return null;
};

const Option = () => null;

const Select1Right = () => {
    return (
        <Select
            overrides={{
                Container: {
                    props: {
                        className: "some-class"
                    }
                },
                Option: {
                    component: Option
                }
            }}
        />
    );
};

/**
 * $ExpectError
 * prettier-ignore
 * Pass prop wrong Component name
 */
const Select2WrongComponent = () => <Select overrides={{ Container1: { props: { className: "some-class" } } }} />;

/**
 * $ExpectError
 * prettier-ignore
 * Pass wrong props field name
 */
const Select2WrongPropsFiledName = () => <Select overrides={{ Container: { props1: { className: "some-class" } } }} />;

/**
 * $ExpectError
 * prettier-ignore
 * Pass non object to props
 */
const Select2NonObjectProps = () => <Select overrides={{ Container: { props: "xxx" } }} />;

/**
 * $ExpectError
 * prettier-ignore
 * Pass non component to component
 */
const Select2NonComponentComponent = () => <Select overrides={{ Container: { component: "xxx" } }} />;
