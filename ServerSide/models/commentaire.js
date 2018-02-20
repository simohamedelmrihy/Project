const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentaireSchema = mongoose.Schema({
  message: {type: String},
  num_accident: {
    type: String,
    ref: 'caracteristiques'
  },
  user:{
    type: Schema.Types.ObjectId, 
    ref:'users'
  }
});

module.exports = mongoose.model('commentaires', commentaireSchema);