
import fs from 'fs'
import { resolve } from 'path'

export function whClassPlugin(){
  return {
      //插件名字
      name:'vite-plugin-whClass',
      enforce: "pre",
      transform(code,id){
        let classNow = fs.readFileSync(resolve(__dirname,'../style.css'),'utf-8')
        const classStr = classNow.split(' ')
        const cTypes = ['w', 'h', 'lh', 'minw', 'minh', 'maxw', 'maxh']
        const keyTypes = ['width', 'height', 'line-height', 'min-width', 'min-height', 'max-width', 'max-height']
        if (id.substring(id.length-4) == '.vue') {
            
            const wClasss = [...(new Set(
              code.split(' ').filter(item=>{
                return /\d+$/.test(item)
              })
            ))]
            // console.log(wClasss)
            const wStr = wClasss.reduce((pre, cur)=>{
              // console.log(cur)
              let tempIndex = cTypes.indexOf(cur.replaceAll(/\d+/g, '').replaceAll('class="', '').replaceAll("class='", ''))
              if ( tempIndex == -1 || classStr.includes('.'+cur)) return pre
              let c = `.${cur.replaceAll('class="', '').replaceAll("class='", '')} {
                ${keyTypes[tempIndex]}: ${cur.replaceAll(/\D+/g, '')}px
              }`
              return pre+`
              ${c}`
            }, '')
            // code = code.replace('</style>', wStr + '' + hStr + '  </style>')
            fs.writeFileSync(resolve(__dirname,'../style.css'), classNow + ' ' + wStr)
        }
        return code;
      }
  }
}