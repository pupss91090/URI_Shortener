const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const outbound = require('./modules/outbound')

router.use('/',home)
router.use('/url_shortener',outbound)

module.exports = router