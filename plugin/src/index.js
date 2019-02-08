import { declare } from "@babel/helper-plugin-utils";
import { generateMemberExpression } from "./memberExpressionGenerator";
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
                const propsMemberExpression = generateMemberExpression([
                    "props",
                    "overrides",
                    path.parentPath.parentPath.node.name.name,
                    "props"
                ]);
                path.replaceWith(propsMemberExpression);
            }
        }
    };
});
