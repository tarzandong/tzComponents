import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {autoClassPlugin} from 'vite-plugin-autoclass'
import { resolve, join } from 'path'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    //生成ts声明文件
    dts({
      include: "./package"
    }),
    // autoClassPlugin({
    // cssFile: 'auto1.css',
    // mainjsFile: 'main.ts',
    // classTypes: {
    //   remw: {key: 'width', unit: 'rem'},
    //   emw: {key: 'width', unit: 'em'}
    //   }
    // })
  ],
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
  },
  build: {
    outDir: "lib", //输出文件名称
    lib: {
      entry: join(__dirname, './package/index.ts'), //指定组件编译入口文件
      name: 'dndlist',
      fileName: (format) => `index.${format}.js` // 打包后的文件名
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    }// rollup打包配置
  }

})
