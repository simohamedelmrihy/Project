let express = require('express');
let router = express.Router();
let userController = require('./../controllers/userController');

router.post('/', function (req, res, next) {
    let us = req.body;
    userController.addUser(us)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.get('/', function (req, res, next) {
    let skip = req.query.skip;
    let limit = req.query.limit;
    let filter = {};
    let pagination = {skip: skip, limit: limit};
    userController.getUserByFilter(filter, pagination)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    userController.getUserById(id)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.post('/:id', function (req, res, next) {
    let us = req.body;
    let id = req.params.id;
    userController.updateUser(id, us)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    userController.deleteUser(id)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

module.exports = router;