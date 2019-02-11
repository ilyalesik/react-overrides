var fs = require("fs");

var babelrc = fs.readFileSync("./.babelrc");
var config;

try {
    config = JSON.parse(babelrc);
} catch (err) {
    console.error("==>     ERROR: Error parsing your .babelrc.");
    console.error(err);
}

require("@babel/register")(config);
require("@babel/polyfill");
const babelCore = require("@babel/core");

const plugin = require("./src");

const inputFile = process.argv[2];

fs.readFile(inputFile, "utf8", (err, code) => {
    if (err) throw err;

    babelCore.transform(
        code,
        {
            plugins: [plugin]
        },
        function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result.code);
        }
    );
});
