
import fs from 'fs'
import { resolve } from 'path'

export function autoClassPlugin(cssFile = 'auto.css', unit='px'){
  let autoCSSFile
  let config
  let autoClassContent = ''
  return {
      //插件名字
      name:'vite-plugin-whClass',
      enforce: "pre",
      configResolved(resolvedConfig) {
        config = resolvedConfig;
        console.log(config.root)
        autoCSSFile =config.root + '/src/'+(cssFile? cssFile : 'auto.css')
        if (!fs.existsSync(autoCSSFile)) fs.writeFileSync(autoCSSFile,'')
        console.log('css created')
      },
      // transformIndexHtml(html) {
      //   return {
      //     html,
      //     // 注入标签
      //     tags: [
      //       {
      //         // 放到 head 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
      //         injectTo: 'head',
      //         // 标签属性定义
      //         attrs: { rel: 'stylesheet', href: '/' + (cssFile? cssFile : 'auto.css') },
      //         // 标签名
      //         tag: 'link',
      //       },
      //     ],
      //   }
      // },
      transform(code,id){
        // let classNow = fs.readFileSync(cssFile,'utf-8')
        // const classStr = classNow.split(' ')
        autoClassContent = fs.readFileSync(autoCSSFile)
        const cTypes = {
          w: {key: 'width', unit},
          h: {key: 'height', unit},
          lh: {key: 'line-height', unit},
          minh: {key: 'min-height', unit},
          minw: {key: 'min-width', unit},
          maxh: {key: 'max-height', unit},
          maxw: {key: 'max-width', unit},
          vw: {key: 'width', unit:'vw'},
          vh: {key: 'height', unit: 'vh'},
          pw: {key: 'width', unit: '%'},
          ph: {key: 'height', unit: '%'},
          p: {key: 'padding', unit},
          pl: {key: 'padding-left', unit},
          pr: {key: 'padding-right', unit},
          pt: {key: 'padding-top', unit},
          pb: {key: 'padding-bottom', unit},
          m: {key: 'margin', unit},
          ml: {key: 'margin-left', unit},
          mr: {key: 'margin-right', unit},
          mt: {key: 'margin-top', unit},
          mb: {key: 'margin-bottom', unit},
          fs: {key: 'font-size', unit},
          bdr:{key: 'border-radius', unit},
          bdrtl:{key: 'border-top-left-radius', unit},
          bdrtr:{key: 'border-top-right-radius', unit},
          bdrbl:{key: 'border-bottom-left-radius', unit},
          bdrbr:{key: 'border-bottom-right-radius', unit},
          op: {key: 'opacity', unit:'%'},
          z: {key: 'z-index', unit:''},
          fl: {key: 'flex', unit: ''}
        }
        if (id.substring(id.length-4) == '.vue') {
            const classArr = code.substring(code.indexOf('<template>'), code.indexOf('</template>')).split(/[ '"]/).filter(item=>{
              return /\d+$/.test(item)
            })
            const wClasss = [...(new Set(classArr))]
            // console.log(wClasss)
            const wStr = wClasss.reduce((pre, cur)=>{
              // console.log(cur)
              const label = cur.replaceAll(/\d+/g, '')
              // console.log(label, cTypes[label])
              if ( !cTypes[label] || autoClassContent.includes(cur) ) return pre
              let c = `.${cur} {
                ${cTypes[label].key}: ${cur.replaceAll(/\D+/g, '')}${cTypes[label].unit}
              }`
              return pre+`
              ${c}`
            }, '')
            // code = code.replace('</style>', wStr + '' + hStr + '  </style>')
            autoClassContent += wStr
            fs.writeFileSync(autoCSSFile, autoClassContent)
        }
        else if (id.substring(id.length - 7) == 'main.ts') {
          console.log(id)
          code = `import './${cssFile? cssFile : 'auto.css'}'
          ${code}`
        }
        return code;
      }
  }
}