// Shim for react-intl-universal: the package has a top-level `types` field but
// its `exports` map lacks a `types` condition, causing TS7016 under
// `moduleResolution: Bundler`. Re-exporting from the typings path fixes this.
export * from "../../node_modules/react-intl-universal/typings/index";
