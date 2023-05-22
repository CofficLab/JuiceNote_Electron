import { rmSync, writeFileSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron, { onstart } from 'vite-plugin-electron'
import pkg from './package.json'

rmSync('release', { recursive: true, force: true })
rmSync('dist', { recursive: true, force: true })
writeFileSync("./playground/index.html", "<h1>文件夹是空的，不会被打包，所以写入这个文件</h1>");
writeFileSync("./logs/index.html", "<h1>文件夹是空的，不会被打包，所以写入这个文件</h1>");

// 打包前与打包后的结构
// database     database
// src          dist 
// node_modules node_modules
// temp         temp

export default defineConfig({
  build: {
    outDir: 'dist/ui',
  },
  base: './',
  root: './',
  plugins: [
    vue(),
    electron({
      // 这个插件负责打包main和preload
      // ui部分的代码由vite负责打包
      main: {
        entry: 'src/main/index.ts',
        vite: {
          build: {
            // For Debug
            sourcemap: true,
            outDir: 'dist/main',
          },
          // Will start Electron via VSCode Debug
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: path.join(__dirname, 'src/preload/index.ts'),
        },
        vite: {
          build: {
            // For Debug
            sourcemap: 'inline',
            outDir: 'dist/preload',
          },
        },
      },
      // Enables use of Node.js API in the Renderer-process
      // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      renderer: {
        // Enables use of Node.js API in the Renderer-process
        nodeIntegration: true,
        // Like Vite's pre bundling
        optimizeDeps: {
          include: [
            'node-pty'
          ],
        },
      },
    }),
  ],
  server: process.env.VSCODE_DEBUG ? {
    host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
    port: pkg.debug.env.VITE_DEV_SERVER_PORT,
  } : undefined,
})
