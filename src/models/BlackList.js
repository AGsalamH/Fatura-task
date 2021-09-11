const mongoose = require('mongoose');
const { Schema } = mongoose;

const blackListSchema = new Schema({
    token: String
});

module.exports = mongoose.model('BlackList', blackListSchema);