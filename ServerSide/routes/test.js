let express = require('express');
let router = express.Router();
let User = require('mongoose').model('users');
let googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC3ze-Giz2AvtsyD8sbDqlDqOrHC8zgeKA'
});

router.get('/', function (req, res, next) {
    User.find({})
        .then(data=>{
          res.send(data);
        })
        .catch(erreur => {
          res.send(erreur);          
        });
});
module.exports = router;