import React from "react";
import o from "react-overrides";

const Select = props => {
    return (
        <Container {...o}>
            {props.options.map((option, key) => (
                <Option {...o} key={key} title={option.title} />
            ))}
        </Container>
    );
};
