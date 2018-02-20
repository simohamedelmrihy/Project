let express = require('express');
let router = express.Router();
let commentaireController = require('./../controllers/commentaireController');

router.post('/', function (req, res, next) {
    let comment = req.body;
    let user = req.auth.userId;
    comment.user = user;
    commentaireController.addCommentaire(comment)
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
    if(req.query.accident){
        filter.num_accident = req.query.accident;
    }
    let pagination = {skip: skip, limit: limit};
    commentaireController.getCommentaireByFilter(filter, pagination)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    commentaireController.getCommentaireById(id)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.post('/:id', function (req, res, next) {
    let veh = req.body;
    let id = req.params.id;
    commentaireController.updateCommentaire(id, veh)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    commentaireController.deleteCommentaire(id)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

module.exports = router;