import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const PORT = process.env.PORT

async function createServer () {
  const app = express()
  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'custom' })
  app.use(vite.middlewares)

  app.use(express.static(path.join(__dirname, './dist')))
  app.use('*', async (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })

  app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000')
  })
}

createServer()
