import React from "react";
import renderer from "react-test-renderer";
import { getComponents } from "../getComponents";

describe("getComponents", () => {
    it("override component", () => {
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

    it("override props", () => {
        const ChildComponent = props => <div {...props} />;

        const Component = props => {
            const {
                ChildComponent: { component: ChildComponent_, props: childComponentProps }
            } = getComponents(
                {
                    ChildComponent
                },
                props.overrides
            );

            return <ChildComponent_ className="class0" {...childComponentProps} />;
        };

        const componentRender = renderer.create(
            <Component overrides={{ ChildComponent: { props: { className: "class1" } } }} />
        );
        const componentInstance = componentRender.root;

        expect(componentInstance.findByType(ChildComponent).props.className).toBe("class1");
    });

    it("don't miss original props", () => {
        const ChildComponent = props => <div {...props} />;

        const Component = props => {
            const {
                ChildComponent: { component: ChildComponent_, props: childComponentProps }
            } = getComponents(
                {
                    ChildComponent
                },
                props.overrides
            );

            return <ChildComponent_ ariaLabel="label" {...childComponentProps} />;
        };

        const componentRender = renderer.create(
            <Component overrides={{ ChildComponent: { props: { className: "class1" } } }} />
        );
        const componentInstance = componentRender.root;

        expect(componentInstance.findByType(ChildComponent).props.className).toBe("class1");
        expect(componentInstance.findByType(ChildComponent).props.ariaLabel).toBe("label");
    });

    it("concatenate props", () => {
        const Component = props => {
            const {
                ChildComponent: { component: ChildComponent_, props: childComponentProps }
            } = getComponents(
                {
                    ChildComponent: props => (
                        <div {...props} className={!props.className ? "class1" : `class1 ${props.className}`} />
                    )
                },
                props.overrides
            );

            return <ChildComponent_ {...childComponentProps} />;
        };

        const componentRender = renderer.create(
            <Component overrides={{ ChildComponent: { props: { className: "class2" } } }} />
        );
        const componentInstance = componentRender.root;

        expect(componentInstance.findByType("div").props.className).toBe("class1 class2");
    });
});
