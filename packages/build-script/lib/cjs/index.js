#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CLI_ARGS_OBJ: () => CLI_ARGS_OBJ,
  CUSTOM_CONFIG: () => CUSTOM_CONFIG,
  PROJECT_ROOT: () => PROJECT_ROOT,
  buildConfig: () => buildConfig,
  devConfig: () => devConfig,
  getCommonConfig: () => getCommonConfig,
  getCustomConfig: () => getCustomConfig,
  isBuild: () => isBuild,
  run: () => run
});
module.exports = __toCommonJS(src_exports);

// src/config/base.ts
var import_path = __toESM(require("path"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_vite = require("vite");
var import_yargs_parser = __toESM(require("yargs-parser"));
var cliArgs = (0, import_yargs_parser.default)(process.argv.slice(2));
var CLI_ARGS_OBJ = cliArgs;
var PROJECT_ROOT = import_path.default.resolve(process.cwd());
var customConfigPath = `${PROJECT_ROOT}/build.config.js`;
if (!import_fs_extra.default.pathExistsSync(customConfigPath)) {
  customConfigPath = `${PROJECT_ROOT}/build.config.ts`;
}
var CUSTOM_CONFIG = null;
var isBuild = !!process.env.VITE_TEST_BUILD;
var getCustomConfig = async () => {
  if (CUSTOM_CONFIG) {
    return CUSTOM_CONFIG;
  }
  if (import_fs_extra.default.pathExistsSync(customConfigPath)) {
    const customConfig = await (0, import_vite.loadConfigFromFile)(
      {},
      customConfigPath,
      PROJECT_ROOT
    );
    CUSTOM_CONFIG = customConfig == null ? void 0 : customConfig.config;
    return customConfig == null ? void 0 : customConfig.config;
  }
};

// src/core/devServer.ts
var import_vite5 = require("vite");

// src/config/vite.dev.ts
var import_vite3 = require("vite");

// src/config/vite.common.ts
var import_vite2 = require("vite");
var import_path2 = __toESM(require("path"));
var import_plugin_react = __toESM(require("@vitejs/plugin-react"));
var import_vite_plugin_eslint = __toESM(require("vite-plugin-eslint"));
var import_vite_plugin_sass_dts = __toESM(require("vite-plugin-sass-dts"));
var getCommonConfig = async () => {
  var _a, _b;
  const CUSTOM_CONFIG2 = await getCustomConfig();
  if (!(CUSTOM_CONFIG2 == null ? void 0 : CUSTOM_CONFIG2.entry)) {
    throw new Error("entry not find");
  }
  const commonConfigJson = (0, import_vite2.defineConfig)({
    root: PROJECT_ROOT,
    build: {
      sourcemap: true,
      lib: {
        name: CUSTOM_CONFIG2.libName,
        entry: import_path2.default.resolve(PROJECT_ROOT, CUSTOM_CONFIG2.entry),
        formats: CUSTOM_CONFIG2.formats || ["cjs", "es"],
        fileName: CUSTOM_CONFIG2.fileName
      },
      rollupOptions: {
        external: CUSTOM_CONFIG2.external || [],
        output: {
          globals: CUSTOM_CONFIG2.global || {}
        }
      }
    },
    plugins: [
      (0, import_vite_plugin_sass_dts.default)({
        enabledMode: ["development", "production"],
        global: {
          generate: true,
          outFile: import_path2.default.resolve(PROJECT_ROOT, "./src/style.d.ts")
        }
      }),
      (0, import_plugin_react.default)(),
      (0, import_vite_plugin_eslint.default)()
    ]
  });
  if (CUSTOM_CONFIG2.libMode === false) {
    (_a = commonConfigJson == null ? void 0 : commonConfigJson.build) == null ? true : delete _a.lib;
    (_b = commonConfigJson == null ? void 0 : commonConfigJson.build) == null ? true : delete _b.rollupOptions;
  }
  return commonConfigJson;
};

// src/config/vite.dev.ts
var devConfig = async () => {
  const CUSTOM_CONFIG2 = await getCustomConfig();
  const commonConfig = await getCommonConfig();
  const config = (0, import_vite3.mergeConfig)(commonConfig, {
    mode: "development",
    configFile: false,
    server: {
      port: 3e3
    }
  });
  return (0, import_vite3.mergeConfig)(config, (CUSTOM_CONFIG2 == null ? void 0 : CUSTOM_CONFIG2.vite) || {});
};

// src/core/devServer.ts
var doDev = async () => {
  const server = await (0, import_vite5.createServer)(await devConfig());
  await server.listen();
  server.printUrls();
};

// src/core/doBuild.ts
var import_vite9 = require("vite");

// src/config/vite.build.ts
var import_vite7 = require("vite");
var import_rollup_plugin_visualizer = require("rollup-plugin-visualizer");
var import_vite_plugin_dts = __toESM(require("vite-plugin-dts"));
var import_path3 = __toESM(require("path"));
var plugins = [
  (0, import_vite_plugin_dts.default)({
    entryRoot: import_path3.default.resolve(PROJECT_ROOT, "./src"),
    compilerOptions: {
      skipDefaultLibCheck: false
    }
  })
];
if (CLI_ARGS_OBJ.analyze) {
  plugins.push(
    (0, import_rollup_plugin_visualizer.visualizer)({
      open: true
    })
  );
}
var buildConfig = async function() {
  var _a;
  const CUSTOM_CONFIG2 = await getCustomConfig();
  const commonConfig = await getCommonConfig();
  const config = (0, import_vite7.mergeConfig)(commonConfig, {
    mode: "production",
    configFile: false,
    build: {
      watch: (_a = CLI_ARGS_OBJ.watch) != null ? _a : false
    },
    plugins
  });
  const finalConfig = (0, import_vite7.mergeConfig)(config, (CUSTOM_CONFIG2 == null ? void 0 : CUSTOM_CONFIG2.vite) || {});
  return finalConfig;
};

// src/core/doBuild.ts
var doBuild = async () => {
  console.log("start to build .....");
  await (0, import_vite9.build)(await buildConfig());
  console.log("build finished.");
};

// src/index.ts
function run() {
  if (CLI_ARGS_OBJ.build) {
    doBuild();
  } else {
    doDev();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CLI_ARGS_OBJ,
  CUSTOM_CONFIG,
  PROJECT_ROOT,
  buildConfig,
  devConfig,
  getCommonConfig,
  getCustomConfig,
  isBuild,
  run
});
//# sourceMappingURL=index.js.map
