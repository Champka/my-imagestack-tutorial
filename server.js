const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Image = require('./src/models/images');

const app = express();
const port = process.env.PORT || 3001;

const mongoUrl = 'mongodb://localhost:27017/my-imagestack';

// Log with Morgan
app.use(morgan('dev'));

// Accept encoded data as well as json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(__dirname + '/dist'));

mongoose.connect(mongoUrl, function(err, db) {
    if(err) {
        console.log('Connection failed due to:' + err);
    } else {
        console.log('Connected to Mongo at:' + mongoUrl);
    }

})

app.route('/image')
    .get((req,res) => {
        Image.find(function(err, images) {
            if (err)
                res.send(err);

            res.json(images);
        })
    })
    .post((req,res) => {
        let image = new Image();

        image.url = req.body.url;
        
        image.save(function(err, image) {
            res.json({
                success: 1,
                message: "Image successfully saved!"
            });
        });        
    });

app.listen(port);
console.log('listening on port: ' + port);