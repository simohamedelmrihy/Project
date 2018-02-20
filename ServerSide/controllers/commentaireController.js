let Q = require('q');
let Commentaire = require('mongoose').model('commentaires');
let carController = require('./caracteristiqueController');
let events = require('events');
let commentaireController = new events.EventEmitter();


commentaireController.addCommentaire = function (data) {
  let deferred = Q.defer();
  let com = new Commentaire(data);
  let filter = {
    _id: com._id
  };
  Commentaire.findOneAndUpdate(filter, com, { new: true, upsert: true })
    .populate('user')
    .populate('num_accident')
    .exec(function (error, result) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

commentaireController.getCommentaireByFilter = function (filter, pagination) {
  let deferred = Q.defer();
  let skip = 0;
  let limit = 20;
  if (pagination !== undefined && 'skip' in pagination && pagination.skip !== undefined)
    skip = parseInt(pagination.skip);
  if (pagination !== undefined && 'limit' in pagination && pagination.limit !== undefined)
    limit = parseInt(pagination.limit);
  if (limit > 100)
    limit = 100;
  Commentaire.find(filter).skip(skip).limit(limit)
    .populate('user')
    .populate('num_accident')
    .exec(function (err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

commentaireController.getCommentaireById = function (id) {
  let deferred = Q.defer();
  Commentaire.findById(id)
    .populate('user')
    .populate('num_accident')
    .exec(function (err, result) {
      if (err) {
        deferred.reject(err);
      } else if (result === null) {
        deferred.reject({});
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

commentaireController.updateCommentaire = function (id, data) {
  let deferred = Q.defer();
  Commentaire.findByIdAndUpdate(id, { $set: data }, { new: true })
    .populate('user')
    .populate('num_accident')
    .exec(function (err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

commentaireController.deleteCommentaire = function (id) {
  let deferred = Q.defer();
  Commentaire.findByIdAndRemove(id)
    .populate('user')
    .populate('num_accident')
    .exec(function (error, result) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

module.exports = commentaireController;