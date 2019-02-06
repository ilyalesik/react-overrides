import path from "path";
import fs from "fs";
import { create } from "babel-test";
import { toMatchFile } from "jest-file-snapshot";

expect.extend({ toMatchFile });

const { fixtures } = create({ babelrc: true });

fixtures("babel-plugin-react-overrides", path.join(__dirname, "fixtures"));
