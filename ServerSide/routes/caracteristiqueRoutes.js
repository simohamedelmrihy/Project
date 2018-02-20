let express = require('express');
let router = express.Router();
let caracteristiqueController = require('./../controllers/caracteristiqueController');
let NodeGeocoder = require('node-geocoder');

let options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyC3ze-Giz2AvtsyD8sbDqlDqOrHC8zgeKA',
    formatter: null
};
let geocoder = NodeGeocoder(options);


router.post('/', function (req, res, next) {
    if (req.auth.role === "admin") {
        geocoder.geocode(req.body.adresse)
            .then(function (response) {
                let latitude = response[0].latitude;
                let longitude = response[0].longitude;
                let acc = req.body;
                let cord = {
                    lat: latitude,
                    lng: longitude
                };
                acc.cordonnees = cord;
                caracteristiqueController.addCaracteristique(acc)
                    .then(function (response) {
                        res.send(response);
                    }, function (error) {
                        res.send(error);
                    });
            })
            .catch(function (erreur) {
                console.log('rrrrrrrrrrrrr', erreur);
            });

    } else {
        res.send({ message: "pas le droit" })
    }
});

router.get('/', function (req, res, next) {
    let skip = req.query.skip;
    let limit = req.query.limit;
    let filter = {};
    let pagination = { skip: skip, limit: limit };
    caracteristiqueController.getCaracteristiqueByFilter(filter, pagination)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    caracteristiqueController.getCaracteristiqueById(id)
        .then(function (response) {
            res.send(response);
        }, function (error) {
            res.send(error);
        });
});

router.post('/:id', function (req, res, next) {
    if (req.auth.role === 'admin') {
        let acc = req.body;
        let id = req.params.id;
        caracteristiqueController.updateCaracteristique(id, acc)
            .then(function (response) {
                res.send(response);
            }, function (error) {
                res.send(error);
            });
    } else {
        res.send({ message: "pas le droit" });
    }
});

router.delete('/:id', function (req, res, next) {
    console.log('heeeeeeeeeeere');
    if (req.auth.role === 'admin') {
        let id = req.params.id;
        caracteristiqueController.deleteCaracteristique(id)
            .then(function (response) {
                res.send(response);
            }, function (error) {
                res.send(error);
            });
    } else {
        res.send({ message: "pas le droit" });
    }
});

module.exports = router;