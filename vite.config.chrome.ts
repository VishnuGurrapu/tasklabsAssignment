import { resolve } from 'path';
import { mergeConfig, defineConfig } from 'vite';
import { crx, ManifestV3Export } from '@crxjs/vite-plugin';
import baseConfig, { baseManifest, baseBuildOptions } from './vite.config.base';

const outDir = resolve(__dirname, 'dist_chrome');

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          background: {
            service_worker: 'src/pages/background/index.ts',
            type: 'module'
          },
          permissions: ['scripting', 'activeTab']
        } as ManifestV3Export,
        browser: 'chrome',
        contentScripts: {
          injectCss: true,
        }
      })
    ],
    build: {
      ...baseBuildOptions,
      outDir,
      rollupOptions: {
        input: {
          popup: resolve(__dirname, 'src/pages/popup/index.html'),
          options: resolve(__dirname, 'src/pages/options/index.html'),
          newtab: resolve(__dirname, 'src/pages/newtab/index.html'),
          devtools: resolve(__dirname, 'src/pages/devtools/index.html'),
          contentScriptImages: resolve(__dirname, 'src/contentScriptImages.ts'),
          contentScriptTables: resolve(__dirname, 'src/contentScriptTables.ts'),
        },
        output: {
          entryFileNames: (chunk) => {
            if (chunk.name === 'contentScriptImages') return 'contentScriptImages.js';
            if (chunk.name === 'contentScriptTables') return 'contentScriptTables.js';
            return '[name].js';
          }
        }
      }
    }
  })
);
