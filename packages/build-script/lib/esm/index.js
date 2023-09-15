#!/usr/bin/env node

// src/config/base.ts
import path from "path";
import fs from "fs-extra";
import { loadConfigFromFile } from "vite";
import argv from "yargs-parser";
var cliArgs = argv(process.argv.slice(2));
var CLI_ARGS_OBJ = cliArgs;
var PROJECT_ROOT = path.resolve(process.cwd());
var customConfigPath = `${PROJECT_ROOT}/build.config.js`;
if (!fs.pathExistsSync(customConfigPath)) {
  customConfigPath = `${PROJECT_ROOT}/build.config.ts`;
}
var CUSTOM_CONFIG = null;
var isBuild = !!process.env.VITE_TEST_BUILD;
var getCustomConfig = async () => {
  if (CUSTOM_CONFIG) {
    return CUSTOM_CONFIG;
  }
  if (fs.pathExistsSync(customConfigPath)) {
    const customConfig = await loadConfigFromFile(
      {},
      customConfigPath,
      PROJECT_ROOT
    );
    CUSTOM_CONFIG = customConfig == null ? void 0 : customConfig.config;
    return customConfig == null ? void 0 : customConfig.config;
  }
};

// src/core/devServer.ts
import { createServer } from "vite";

// src/config/vite.dev.ts
import { mergeConfig } from "vite";

// src/config/vite.common.ts
import { defineConfig } from "vite";
import path2 from "path";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import sassDts from "vite-plugin-sass-dts";
var getCommonConfig = async () => {
  var _a, _b;
  const CUSTOM_CONFIG2 = await getCustomConfig();
  if (!(CUSTOM_CONFIG2 == null ? void 0 : CUSTOM_CONFIG2.entry)) {
    throw new Error("entry not find");
  }
  const commonConfigJson = defineConfig({
    root: PROJECT_ROOT,
    build: {
      sourcemap: true,
      lib: {
        name: CUSTOM_CONFIG2.libName,
        entry: path2.resolve(PROJECT_ROOT, CUSTOM_CONFIG2.entry),
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
      sassDts({
        enabledMode: ["development", "production"],
        global: {
          generate: true,
          outFile: path2.resolve(PROJECT_ROOT, "./src/style.d.ts")
        }
      }),
      react(),
      eslint()
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
  const config = mergeConfig(commonConfig, {
    mode: "development",
    configFile: false,
    server: {
      port: 3e3
    }
  });
  return mergeConfig(config, (CUSTOM_CONFIG2 == null ? void 0 : CUSTOM_CONFIG2.vite) || {});
};

// src/core/devServer.ts
var doDev = async () => {
  const server = await createServer(await devConfig());
  await server.listen();
  server.printUrls();
};

// src/core/doBuild.ts
import { build } from "vite";

// src/config/vite.build.ts
import { mergeConfig as mergeConfig2 } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
import path3 from "path";
var plugins = [
  dts({
    entryRoot: path3.resolve(PROJECT_ROOT, "./src"),
    compilerOptions: {
      skipDefaultLibCheck: false
    }
  })
];
if (CLI_ARGS_OBJ.analyze) {
  plugins.push(
    visualizer({
      open: true
    })
  );
}
var buildConfig = async function() {
  var _a;
  const CUSTOM_CONFIG2 = await getCustomConfig();
  const commonConfig = await getCommonConfig();
  const config = mergeConfig2(commonConfig, {
    mode: "production",
    configFile: false,
    build: {
      watch: (_a = CLI_ARGS_OBJ.watch) != null ? _a : false
    },
    plugins
  });
  const finalConfig = mergeConfig2(config, (CUSTOM_CONFIG2 == null ? void 0 : CUSTOM_CONFIG2.vite) || {});
  return finalConfig;
};

// src/core/doBuild.ts
var doBuild = async () => {
  console.log("start to build .....");
  await build(await buildConfig());
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
export {
  CLI_ARGS_OBJ,
  CUSTOM_CONFIG,
  PROJECT_ROOT,
  buildConfig,
  devConfig,
  getCommonConfig,
  getCustomConfig,
  isBuild,
  run
};
//# sourceMappingURL=index.js.map
