import React from "react";
import o, { getComponents } from "react-overrides";

const OverridableButton = (props) => {
    const Container = ButtonContainer;
    const Text = Buttons;
    const Icon = () => null;

    return (
        <Container {...o} as="button">
            <Icon {...o} />
            <Text {...o}>{props.children}</Text>
        </Container>
    );
};
