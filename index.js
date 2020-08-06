let keepModules = false // false by default

// import presets
const presetEnv = require("@babel/preset-env")
const presetReact = require("@babel/preset-react")
const presetFlow = require("@babel/preset-flow")

// const plugins
const pluginProposalFunctionBind = require("@babel/plugin-proposal-function-bind")

const pluginProposalExportDefaultFrom = require("@babel/plugin-proposal-export-default-from")
const pluginProposalLogicalAssignmentOperator = require("@babel/plugin-proposal-logical-assignment-operators")
const pluginProposalOptionalChaining = require("@babel/plugin-proposal-optional-chaining")
const pluginProposalPipelineOperator = require("@babel/plugin-proposal-pipeline-operator")
const pluginProposalCoalescingOperator = require("@babel/plugin-proposal-nullish-coalescing-operator")
const pluginProposalDoExpressions = require("@babel/plugin-proposal-do-expressions")

const pluginProposalDecorators = require("@babel/plugin-proposal-decorators")
const pluginProposalFunctionSent = require("@babel/plugin-proposal-function-sent")
const pluginProposalExportNameSpaceFrom = require("@babel/plugin-proposal-export-namespace-from")
const pluginProposalNumericSeperator = require("@babel/plugin-proposal-numeric-separator")
const pluginProposalThrowExpressions = require("@babel/plugin-proposal-throw-expressions")

const pluginProposalImportMeta = require("@babel/plugin-syntax-import-meta")
const pluginProposalClassProperties = require("@babel/plugin-proposal-class-properties")
const pluginProposalJSONStrings = require("@babel/plugin-proposal-json-strings")

// module tranformer
const pluginTransformModulesCommonJS = require("@babel/plugin-transform-modules-commonjs")
const pluginSyntaxDynamicImport = require("@babel/plugin-syntax-dynamic-import")
const pluginAddModuleExports = require("babel-plugin-add-module-exports")


if (process.env.BABEL_ENV === "production") {
  keepModules = true
  console.warn("setting `BABEL_ENV` to `production` for bypassing ES6 module transformming is deprecated. Use BABEL_KEEP_MODULES=\"true\" instead.")
}

if (process.env.BABEL_ENV === "development") {
  console.warn("setting `BABEL_ENV` to `development` for transforming ES6 modules is deprecated. Use BABEL_KEEP_MODULES=\"false\" instead.")
}

if (process.env.BABEL_KEEP_MODULES === "true") {
  keepModules = true
}

let presets = [
  [
    presetEnv,
    {
      targets: {
        electron: 5,
      },
      modules: keepModules ? "false" : "commonjs"
    },
  ],
  presetReact,
  presetFlow
];

let plugins = [
  pluginProposalFunctionBind,

  pluginProposalExportDefaultFrom,
  pluginProposalLogicalAssignmentOperator,
  [pluginProposalOptionalChaining, { loose: false }],
  [pluginProposalPipelineOperator, { proposal: "minimal" }],
  [pluginProposalCoalescingOperator, { loose: false }],
  pluginProposalDoExpressions,

  [pluginProposalDecorators, { legacy: true }],
  pluginProposalFunctionSent,
  pluginProposalExportNameSpaceFrom,
  pluginProposalNumericSeperator,
  pluginProposalThrowExpressions,

  pluginProposalImportMeta,
  [pluginProposalClassProperties, { loose: true }],
  pluginProposalJSONStrings,
];


// transform modules (e.g when without Rollup)
if (!keepModules) {
  plugins.push(...[
      pluginTransformModulesCommonJS,
      pluginSyntaxDynamicImport,
      [pluginAddModuleExports, {addDefaultProperty: false}] // atom needs this
  ]);
}


module.exports = () => {return {
  presets: presets,
  plugins: plugins,
  exclude: "node_modules/**",
  sourceMap: "inline",
};}
