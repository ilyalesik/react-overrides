import { declare } from "@babel/helper-plugin-utils";
const t = require("@babel/types");

export default declare((api, options, dirname) => {
    api.assertVersion(7);

    return {
        name: "babel-plugin-react-overrides",

        visitor: {}
    };
});
