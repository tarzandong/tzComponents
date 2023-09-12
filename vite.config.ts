import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {autoClassPlugin} from './src/vite-plugin/autoCSS.js'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [autoClassPlugin(), vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@views': resolve(__dirname, 'src/views')
    }
  },
  css: {
    // postcss: {
    //   plugins: [
    //     autoprefixer({
    //       overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
    //     }),
    //     postCssPxToRem({
    //       // 自适应，px>rem转换
    //       rootValue: 180, // 75表示750设计稿，37.5表示375设计稿
    //       propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
    //     }),
    //   ],
    // },
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        additionalData: '@import "src/assets/scss/variables.scss";',
        javascriptEnabled: true
      }
    }
  },
  server: {
    open: true
  }
})
