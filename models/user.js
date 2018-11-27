// JavaScript source code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    score : Number
})

module.exports = mongoose.model('user', userSchema);