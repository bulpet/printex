var config      = require('../config');
var mongoose    = require('mongoose');
var log         = require('../log')(module);

//mongoose.connect(config.get('mongoose:uri')));
mongoose.connect('mongodb://localhost/printex');

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

var Model = new Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now }
});

// validation
Model.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var ModelFactory = mongoose.model('Model', Model);

module.exports.ModelFactory = ModelFactory;