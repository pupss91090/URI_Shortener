const mongoose = require('mongoose')
const Schema = mongoose.Schema
const weburlSchema = new Schema({
    original_url: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    new_url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Weburl', weburlSchema)