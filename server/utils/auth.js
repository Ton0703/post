const { secret } = require('../config')
const jwt = require('koa-jwt')

const auth = jwt({ secret })

module.exports = auth

