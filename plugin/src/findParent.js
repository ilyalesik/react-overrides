export const findParent = (path, predicat) => {
    if (!path.parentPath) {
        return;
    }
    if (predicat(path.parentPath)) {
        return path.parentPath;
    }
    return findParent(path.parentPath, predicat);
};
