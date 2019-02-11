export const findParent = (path, predicat) => {
    if (!path.parentPath) {
        return;
    }
    if (predicat(path.parentPath)) {
        return path.parentPath;
    }
    return findParent(path.parentPath, predicat);
};

export const findHighestParent = (path, predicat) => {
    const result = findParent(path, predicat);
    if (!findParent(result, predicat)) {
        return result;
    }
    return findHighestParent(result, predicat);
};
