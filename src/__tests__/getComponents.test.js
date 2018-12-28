import React from "react";
import renderer from "react-test-renderer";
import { getComponents } from "../getComponents";

describe("getComponents", () => {
    it("pass component", () => {
        const Component = props => {
            const {
                PassedComponent: { component: PassedComponent }
            } = getComponents(
                {
                    PassedComponent: () => <div />
                },
                props.overrides
            );

            return <PassedComponent />;
        };

        const PassedComponent = () => <button />;

        const componentRender = renderer.create(
            <Component overrides={{ PassedComponent: { component: PassedComponent } }} />
        );
        const componentInstance = componentRender.root;

        expect(componentInstance.findAllByType(PassedComponent).length).toBe(1);
    });
});
