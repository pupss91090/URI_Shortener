const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// 設定連線到 mongoDB  
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const Weburl = require('./models/weburl')
const codeGenerator = require('./code_generator')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {})
})

app.post('/result', (req, res) => {
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

app.get('/url_shortener/:code', (req, res) => {
    const code = req.params.code
    Weburl.findOne({ code: code })
        .lean()
        .then(weburl => res.redirect(`${weburl.original_url}`))
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})
