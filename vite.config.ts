import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import { resolve } from 'path';

function pathResolve(dir: string): string {
  return resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        reactivityTransform: true
      }
    ),
    vueJsx(),
    AutoImport({
      resolvers: [
        AntDesignVueResolver()
      ]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver(),
        IconsResolver()
      ]
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    }),
    Icons({ autoInstall: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'assets': pathResolve('src/assets'),
      'components': pathResolve('src/components'),
      'router': pathResolve('src/router'),
      'stores': pathResolve('src/stores'),
      'views': pathResolve('src/views')
    }
  },
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`
    ],
  },
});
