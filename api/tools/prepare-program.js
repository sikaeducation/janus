"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
function getAllChildren(program) {
    return (0, fp_1.uniq)([
        ...program.root.children,
        ...program.posts.flatMap((post) => post.children),
    ]);
}
function getAllPostSlugs(program) {
    return program.posts.map((post) => post.slug);
}
function getParent(posts, slug) {
    return posts.find((post) => post.children.includes(slug));
}
function getDuplicates(array) {
    return Object.entries(array.reduce((counts, slug) => {
        return Object.assign(Object.assign({}, counts), { [slug]: counts[slug] ? counts[slug] + 1 : 1 });
    }, {}))
        .filter(([key, value]) => value > 1)
        .map(([key, value]) => key);
}
function childrenMatchPosts(program) {
    const slugs = getAllPostSlugs(program).sort();
    const duplicates = getDuplicates(slugs);
    if (duplicates.length > 0)
        return new Error(`These posts have more than one entry:\n\n${duplicates.join("\n")}`);
    const children = getAllChildren(program).sort();
    const unmatchedSlugs = (0, fp_1.xor)(children, slugs);
    return (0, fp_1.isEqual)(slugs, children)
        ? true
        : new Error(`Children must match posts:\n\n${unmatchedSlugs.join("\n")}`);
}
function getPath(posts, slug) {
    const segments = [slug];
    let parent = getParent(posts, slug);
    while (parent) {
        segments.unshift(parent.slug);
        parent = getParent(posts, parent.slug);
    }
    return `/${segments.join("/")}`;
}
function prepareProgram(program) {
    if (!program.root.children.length) {
        return new Error("Root post needs children");
    }
    const match = childrenMatchPosts(program);
    if (match instanceof Error)
        return match;
    return Object.assign(Object.assign({}, program), { root: Object.assign(Object.assign({}, program.root), { path: "/" }), posts: program.posts.map((post) => {
            return Object.assign(Object.assign({}, post), { path: getPath(program.posts, post.slug) });
        }) });
}
exports.default = prepareProgram;
//# sourceMappingURL=prepare-program.js.map