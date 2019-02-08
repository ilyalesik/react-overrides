const t = require("@babel/types");

export const generateMemberExpression = items => {
    const lastItem = items[items.length - 1];
    const itemsWithoutLast = items.slice(0, items.length - 1);
    return t.memberExpression(
        itemsWithoutLast.length === 1 ? t.identifier(itemsWithoutLast[0]) : generateMemberExpression(itemsWithoutLast),
        t.identifier(lastItem)
    );
};
