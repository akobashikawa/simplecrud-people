var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Person = mongoose.model('Person');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.get('/people', function(req, res, next) {
	var id = req.query.id;
	if (id) {
	    Person.findById(id, function(err, item, count) {
	        res.json(item);
	    });
	} else {
	    Person.find(function(err, items, count) {
	        res.json(items);
	    });
	}
});

router.post('/people', function(req, res, next) {
    var name = req.body.name;
    Person.create({
        name: name
    }, function(err, item) {
        Person.find(function(err, items, count) {
            res.json(items);
        });
    });
});

router.put('/people', function(req, res, next) {
    Person.findByIdAndUpdate(req.body.id, req.body, function(err, item) {
        Person.find(function(err, items, count) {
            res.json(items);
        });
    });
});

router.delete('/people', function(req, res, next) {
    Person.findByIdAndRemove(req.query.id, function(err, item) {
        Person.find(function(err, items, count) {
            res.json(items);
        });
    });
});

module.exports = router;