import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type ViteDevServer } from 'vite'

const requirementsPath = resolve(process.cwd(), '../../../docs/需求确认.md')
const healthRecordFlowPath = resolve(process.cwd(), '../../../docs/流程图/完整业务流程图集.html')
const flowDiagramDirectory = resolve(process.cwd(), '../../../docs/流程图')

function serveRequirementsDocument(server: ViteDevServer) {
  server.middlewares.use('/__project-requirements.md', (_request, response) => {
    try {
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/markdown; charset=utf-8')
      response.setHeader('Cache-Control', 'no-store')
      response.end(readFileSync(requirementsPath, 'utf8'))
    } catch {
      response.statusCode = 404
      response.end('需求确认文档未找到。')
    }
  })
  server.middlewares.use('/__health-record-flow.html', (_request, response) => {
    try {
      const flowMarkup = readFileSync(healthRecordFlowPath, 'utf8')
        .replace(/<p>所有流程均使用完整图[^<]*<\/p>/, '')
        .replace(
          /(<iframe\b[^>]*\bsrc=")(.*?\.html)(")/g,
          (_match, prefix: string, source: string, suffix: string) => `${prefix}/__flow-diagram/${encodeURIComponent(source)}${suffix}`,
        )
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html; charset=utf-8')
      response.setHeader('Cache-Control', 'no-store')
      response.end(flowMarkup)
    } catch {
      response.statusCode = 404
      response.end('完整业务流程图集未找到。')
    }
  })
  server.middlewares.use('/__flow-diagram/', (request, response) => {
    try {
      const pathname = (request.url ?? '').split('?')[0]
      const filename = decodeURIComponent(pathname.replace(/^\/+/, ''))
      if (!/^[^\\/]+\.html$/.test(filename)) throw new Error('invalid flow diagram path')

      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html; charset=utf-8')
      response.setHeader('Cache-Control', 'no-store')
      const flowMarkup = readFileSync(resolve(flowDiagramDirectory, filename), 'utf8').replace(
        '</head>',
        '<style>body>p,main.frame>.lede{display:none!important}</style></head>',
      )
      response.end(flowMarkup)
    } catch {
      response.statusCode = 404
      response.end('流程图未找到。')
    }
  })
}

export default defineConfig({
  base: './',
  server: { port: 4173 },
  preview: { port: 4173 },
  plugins: [{
    name: 'project-documents-embed',
    configureServer: serveRequirementsDocument,
    configurePreviewServer: serveRequirementsDocument
  }]
})
