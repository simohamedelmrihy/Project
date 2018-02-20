let mongoose = require('mongoose');

module.exports = function() {
  let db = mongoose.connect('mongodb://localhost:27017/accidents', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
  });
  require ("../models/user.js");
  require ("../models/commentaire.js");
  require ("../models/caracteristique.js");
  return db;
};