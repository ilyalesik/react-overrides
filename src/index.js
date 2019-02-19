// @flow

export { getComponents } from "./getComponents";
export type { ExtractOverridesProps } from "./ExtractOverridesProps";

type TOObject = {
    (): { [string]: any }
};
function returnObject() {
    return {};
}

export default (returnObject: TOObject);
