const Koa = require('koa')
const Router = require('koa-router');
const opn = require('opn');

// 需要node版本v14.17.3及以上
const fs = require('fs/promises')

const app = new Koa()
const router = new Router()

// 生成路由
const paths = fs.readdir('./src');
paths.then((urls) => {
  urls.forEach(url => {
    router.get(`/${url}`, async (ctx, next) => {
      const content = await fs.readFile(`./src/${url}`, { encoding: 'utf8' })
      ctx.body = content
    })
  })
})

const port = 9517

app.use(router.routes()).use(router.allowedMethods()).listen(port)

console.log(`浏览器预览：`, `\x1B[36mhttp://localhost:${port}\x1B[0m`)

// open -a "/Applications/Google Chrome.app" "http://www.baidu.com"
// require('child_process').execSync(`open http://localhost:${port}`);
opn(`http://localhost:${port}/react-worker.html`, { app: ['google chrome', '--incognito'] });
