import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{
      find: "@",
      replacement: path.resolve(__dirname, 'src')
    }, {
      find: "components",
      replacement: path.resolve(__dirname, 'src/components')
    }, {
      find: "vites",
      replacement: path.resolve(__dirname, 'src/view')
    }]
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/index`,
        },
      ],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // 是否开启 https
    https: false,
  }
})
