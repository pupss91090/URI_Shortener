const express = require('express')
const router = express.Router()

const Weburl = require('../../models/weburl')
const codeGenerator = require('../../code_generator')

router.get('/', (req, res) => {
    res.render('index', {})
})

router.post('/result', (req, res) => {
    Weburl.find()
        .lean()
        .then(weburls => {
            const repeatData =
                weburls.filter((weburl) => {
                    return weburl.original_url === req.body.original_url
                })
            // 資料庫中已有重複的網址資料時，叫出既有資料的縮址。
            if (repeatData.length > 0) {
                Weburl.findById(repeatData[0]._id)
                    .lean()
                    .then(weburl => res.render('result', { weburl }))
                    .catch(error => console.error(error))
            } else {
                const original_url = req.body.original_url
                const code = codeGenerator()
                const new_url = `http://localhost:3000/url_shortener/${code}`

                return Weburl.create({
                    original_url: original_url,
                    code: code,
                    new_url: new_url
                })
                    .then(data => Weburl.findById(data.id)
                        .lean()
                        .then(weburl => res.render('result', { weburl }))
                    )
                    .catch(error => console.error(error))
            }
        })
})

module.exports = router