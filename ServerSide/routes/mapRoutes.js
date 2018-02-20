let express = require('express');
let mongoose = require('mongoose');
let Car = mongoose.model('caracteristiques');
let polyline = require('polyline');
let geolib = require('geolib');
let router = express.Router();
let googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC3ze-Giz2AvtsyD8sbDqlDqOrHC8zgeKA'
});
let circleToPolygon = require('circle-to-polygon');
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyC3ze-Giz2AvtsyD8sbDqlDqOrHC8zgeKA', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

router.post('/', function (req, res, next) {
  var tab = [];
  var markers = [];
  googleMapsClient.directions({ origin: req.body.origin, destination: req.body.destination }, (err, result) => {
    var routes = result.json.routes;
    var legs = [];
    var steps = [];
    for (var i = 0; i < routes.length; i++) {
      legs = routes[i].legs;
      for (var j = 0; j < legs.length; j++) {
        steps = legs[j].steps;
        for (var k = 0; k < steps.length; k++) {
          tab.push(steps[k].polyline);
        }
      }
    }
    var tab1 = [];
    for (var i = 0; i < tab.length; i++) {
      tab1.push(polyline.decode(tab[i].points));
    }
    var tab2 = [];
    var tab3 = [];
    var z = 0;
    var maxlng;
    var maxltd;
    var minlng;
    var minltd;
    for (var i = 0; i < tab1.length; i++) {
      tab2 = tab1[i];
      if (i === 0) {
        for (j = 0; j < tab2.length; j++) {
          var obj = {};
          obj.latitude = tab2[j][0];
          obj.longitude = tab2[j][1];
          tab3.push(obj);
        }
      } else {
        for (j = 1; j < tab2.length; j++) {
          var obj = {};
          obj.latitude = tab2[j][0];
          obj.longitude = tab2[j][1];
          tab3.push(obj);
        }
      }
    }
    for (var i = 0; i < tab3.length; i++) {
      if (i === 0) {
        maxlng = tab3[i].longitude;
        minlng = tab3[i].longitude;
        maxltd = tab3[i].latitude;
        minltd = tab3[i].latitude;
      } else {
        if (tab3[i].longitude > maxlng) {
          maxlng = tab3[i].longitude
        }
        if (tab3[i].longitude < minlng) {
          minlng = tab3[i].longitude;
        }
        if (tab3[i].latitude > maxltd) {
          maxltd = tab3[i].latitude;
        }
        if (tab3[i].latitude < minltd) {
          minltd = tab3[i].latitude;
        }
      }
    }
    Car.find({
      'cordonnees.lat': { $lt: maxltd, $gt: minltd },
      'cordonnees.lng': { $lt: maxlng, $gt: minlng }
    }
    ).then(resultat => {
      for (var i = 0; i < resultat.length; i++) {
        for (var j = 0; j < tab3.length - 1; j++) {
          var isInLine1 = geolib.isPointInCircle({ latitude: resultat[i].cordonnees.lat, longitude: resultat[i].cordonnees.lng }, tab3[j], 500);
          if (isInLine1 == true) {
            var marker = { latitude: resultat[i].cordonnees.lat, longitude: resultat[i].cordonnees.lng, grav: resultat[i].indiceGravite, _id: resultat[i]._id };
            markers.push(marker);
            break;
          }
        }
      }
      res.send(markers);
    })
      .catch(erreur => {
        res.send(erreur);
      });
  });
});

router.post('/circle', function (req, res, next) {
  var tab = [];
  geocoder.geocode(req.body.origin)
  .then(function(response) {
    let latitude = response[0].latitude; 
    let longitude = response[0].longitude;
    let polygon = circleToPolygon([longitude, latitude], req.body.distance, 20);
    var maxlng;
    var maxltd;
    var minlng;
    var minltd;
    console.log('ooooooooooooo', polygon.coordinates[0]);
    var cordn = polygon.coordinates[0];
    for (var i = 0; i < cordn.length; i++) {
      if (i === 0) {
        maxlng = cordn[i][0];
        minlng = cordn[i][0];
        maxltd = cordn[i][1];
        minltd = cordn[i][1];
      } else {
        if (cordn[i][0] > maxlng) {
          maxlng = cordn[i][0];
        }
        if (cordn[i][0] < minlng) {
          minlng = cordn[i][0];
        }
        if (cordn[i][1] > maxltd) {
          maxltd = cordn[i][1];
        }
        if (cordn[i][1] < minltd) {
          minltd = cordn[i][1];
        }
      }
    }

    Car.find({
      'cordonnees.lat': { $lt: maxltd, $gt: minltd },
      'cordonnees.lng': { $lt: maxlng, $gt: minlng }
    }
    ).then(resultat => {
      for(var i=0; i<resultat.length; i++){
        var isInLine1 = geolib.isPointInCircle({ latitude: resultat[i].cordonnees.lat, longitude: resultat[i].cordonnees.lng }, {latitude: latitude, longitude: longitude}, req.body.distance);
        if(isInLine1){
          tab.push(resultat[i])
        }
      }
      var toSend = {
        resultat: tab,
        centre: [latitude, longitude]
      } ;
      res.send(toSend);
    }).catch(errer => {
      console.log('rrrrrrrrrrrrrrr', errer);
    })
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;