const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const routes = require('./routes/index')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})
