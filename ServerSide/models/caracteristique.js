const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caractSchema = mongoose.Schema({
  indiceGravite: {type: Number},
  nbreDeces:{type: Number},
  nbreHosspitalise:{type: Number},
  nbreBlesseleger:{type: String},
  lumiere:{type: String},
  organisme:{type: String},
  atm: {type: String},
  col:{type: String},
  catRoute: {type: String},
  regime: {type: String},
  departement: {type: String},
  situation: {type: String},
  codeInsee: {type: String},
  adresse: {type: String},
  voie: {type: String},
  numAccident: {type: String},
  cordonnees:{
    lng: {type: Number},
    lat: {type: Number},
  },
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'commentaires',
  }],
});

module.exports = mongoose.model('caracteristiques', caractSchema);