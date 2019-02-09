const t = require("@babel/types");

export const generateMemberExpression = items => {
    const lastItem = items[items.length - 1];
    const itemsWithoutLast = items.slice(0, items.length - 1);
    return t.memberExpression(
        itemsWithoutLast.length === 1 ? t.identifier(itemsWithoutLast[0]) : generateMemberExpression(itemsWithoutLast),
        t.identifier(lastItem)
    );
};

export const generateSafetyMemberExpression = (items, fallbackValue = t.objectExpression([])) => {
    const checkTypeofVariable = t.binaryExpression(
        "!==",
        t.unaryExpression("typeof", t.identifier(items[0]), true),
        t.stringLiteral("undefined")
    );

    const _toCheckUndefinedMemberLogicalExpression = items => {
        if (items.length === 2) {
            return generateMemberExpression(items);
        }
        return t.logicalExpression(
            "&&",
            _toCheckUndefinedMemberLogicalExpression(items.slice(0, items.length - 1)),
            generateMemberExpression(items)
        );
    };

    return t.logicalExpression(
        "||",
        t.logicalExpression("&&", checkTypeofVariable, _toCheckUndefinedMemberLogicalExpression(items)),
        fallbackValue
    );
};
