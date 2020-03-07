const express = require('express')
const router = express.Router({
  mergeParams: true
})
const AdminUser = require('../../models/AdminUser')
const assert = require('http-assert')

const authMiddleware = require('../../middleware/auth')
const resourceMiddleware = require('../../middleware/resource')

module.exports = (app) => {
  //资源列表接口
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  //资源详情接口
  router.get('/:id', async (req, res) => {
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  //上传文件存放目录及添加 url
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res, next) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //首次登录返回token
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //1.由用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: "用户不存在"
    //   })
    // }
    //2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    //3.返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send(token)

  })
  //错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message
    })
  })
}