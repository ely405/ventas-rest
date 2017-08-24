'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: {type: Number, default: 0, required: true},
    description: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', productSchema);