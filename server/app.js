const Koa = require('koa')
const koaBody = require('koa-body')
const route = require('./route')
const path = require('path')
const { open } = require('./db/db')
const app = new Koa()

open()
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true,
    }
}))
route(app)

app.listen(3030 , () => {
    console.log('后端在3030启动了')
})