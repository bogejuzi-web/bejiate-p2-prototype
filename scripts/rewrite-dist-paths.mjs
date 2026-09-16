// 构建后处理：把 dist 产物中的绝对路径引用改为相对路径，
// 使原型可以部署在 GitHub Pages 等子路径环境下。
// 不修改 public/ 源文件，本地 dev（根路径）行为保持不变。
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')

function listFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? listFiles(full) : [full]
  })
}

let changed = 0

// 1) dist/pages/*.html：页面位于 pages/ 下，根资源需回退一层。
//    既处理 src/href 属性，也处理 JS 字符串里的页面地址（location.replace、frame.src 等）。
for (const file of listFiles(join(distDir, 'pages')).filter((f) => f.endsWith('.html'))) {
  const before = readFileSync(file, 'utf8')
  const after = before
    .replace(/(['"`])\/pages\//g, '$1../pages/')
    .replace(/(['"`])\/illustrations\//g, '$1../illustrations/')
    .replace(/(\b(?:src|href)=")\/(?!\/)/g, '$1../')
  if (after !== before) {
    writeFileSync(file, after)
    changed += 1
  }
}

// 2) dist 下所有 js（含 assets 内的打包产物）：页面地址与插图地址相对化。
//    这些字符串由位于站点根的 shell 页面解析，因此相对根目录即可。
for (const file of listFiles(distDir).filter((f) => f.endsWith('.js'))) {
  const before = readFileSync(file, 'utf8')
  const after = before
    .replace(/(['"`])\/pages\//g, '$1pages/')
    .replace(/(['"`])\/illustrations\//g, '$1illustrations/')
  if (after !== before) {
    writeFileSync(file, after)
    changed += 1
  }
}

// 3) 校验：dist 中不应再残留会在子路径下失效的绝对引用
const leftovers = []
for (const file of listFiles(distDir).filter((f) => /\.(html|js|css)$/.test(f))) {
  const text = readFileSync(file, 'utf8')
  if (/(?:src|href)="\/(?!\/)/.test(text)) leftovers.push(`${file} (src/href 绝对路径)`)
  if (/(['"`])\/(?:pages|illustrations)\//.test(text)) leftovers.push(`${file} (pages/illustrations 绝对路径)`)
}

console.log(`[rewrite-dist-paths] 已改写 ${changed} 个文件`)
if (leftovers.length) {
  console.error('[rewrite-dist-paths] 仍存在绝对路径引用：')
  leftovers.forEach((item) => console.error('  - ' + item))
  process.exit(1)
}
console.log('[rewrite-dist-paths] 校验通过：无残留绝对路径')
