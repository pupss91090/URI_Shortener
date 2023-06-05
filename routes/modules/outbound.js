const express = require('express')
const router = express.Router()

const Weburl = require('../../models/weburl')
const codeGenerator = require('../../code_generator')

router.get('/:code', (req, res) => {
    const code = req.params.code
    Weburl.findOne({ code: code })
        .lean()
        .then(weburl => res.redirect(`${weburl.original_url}`))
})

module.exports = router