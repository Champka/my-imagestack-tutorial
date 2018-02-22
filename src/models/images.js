'use strict';

//import dependency
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var ImagesSchema = new Schema({
    url: String
});

//export our module to use in server.js
module.exports = mongoose.model('Image', ImagesSchema);