import { declare } from "@babel/helper-plugin-utils";
import { generateMemberExpression, generateSafetyMemberExpression } from "./memberExpressionGenerator";
import { findParent } from "./findParent";
const t = require("@babel/types");

export default declare((api, options, dirname) => {
    api.assertVersion(7);
    let reactOverridesImportName = null;

    return {
        name: "babel-plugin-react-overrides",

        visitor: {
            ImportDeclaration: path => {
                if (!path.node.source.value === "react-overrides") {
                    return;
                }
                const defaultSpecifier = path.node.specifiers.find(specifier => t.isImportDefaultSpecifier(specifier));
                if (!defaultSpecifier) {
                    return;
                }
                reactOverridesImportName = defaultSpecifier.local.name;
            },
            Identifier: path => {
                if (
                    !reactOverridesImportName ||
                    path.node.name !== reactOverridesImportName ||
                    !t.isJSXSpreadAttribute(path.parentPath)
                ) {
                    return;
                }
                const openingElement = path.parentPath.parentPath;
                const jsxElement = path.parentPath.parentPath.parentPath;
                const ComponentName = openingElement.node.name.name;

                const propsMemberExpression = generateSafetyMemberExpression([
                    "props",
                    "overrides",
                    ComponentName,
                    "props"
                ]);
                path.replaceWith(propsMemberExpression);

                const arrowFunctionExpression = findParent(path, path => t.isArrowFunctionExpression(path));
                if (!t.isBlockStatement(arrowFunctionExpression.node.body)) {
                    arrowFunctionExpression.node.body = t.blockStatement([
                        t.returnStatement(arrowFunctionExpression.node.body)
                    ]);
                }
                const blockStatement = arrowFunctionExpression.node.body;
                const componentMemberExpression = generateSafetyMemberExpression(
                    ["props", "overrides", ComponentName, "component"],
                    t.identifier(ComponentName)
                );
                const ComponentNameReplacement = ComponentName + "OverridesReplacement";
                openingElement.node.name.name = ComponentNameReplacement;
                if (jsxElement.node.closingElement) {
                    jsxElement.node.closingElement.name.name = ComponentNameReplacement;
                }
                const componentReplacementVariableDeclaration = t.variableDeclaration("const", [
                    t.variableDeclarator(t.identifier(ComponentNameReplacement), componentMemberExpression)
                ]);
                blockStatement.body.splice(blockStatement.body.length - 1, 0, componentReplacementVariableDeclaration);
            }
        }
    };
});
