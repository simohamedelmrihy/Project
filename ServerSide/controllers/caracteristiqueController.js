let Q = require('q');
let Caracteristique = require('mongoose').model('caracteristiques');
let events = require('events');
let caracteristiqueController = new events.EventEmitter();


caracteristiqueController.addCaracteristique = function (data) {
  let deferred = Q.defer();
  let caract = new Caracteristique(data);
  let filter = {
    _id: caract._id
  };
  Caracteristique.findOneAndUpdate(filter, caract, { new: true, upsert: true })
    .populate('comment')
    .exec(function (error, result) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

caracteristiqueController.getCaracteristiqueByFilter = function (filter, pagination) {
  let deferred = Q.defer();
  let skip = 0;
  let limit = 20;
  if (pagination !== undefined && 'skip' in pagination && pagination.skip !== undefined)
    skip = parseInt(pagination.skip);
  if (pagination !== undefined && 'limit' in pagination && pagination.limit !== undefined)
    limit = parseInt(pagination.limit);
  if (limit > 100)
    limit = 100;
  Caracteristique.find(filter).skip(skip).limit(limit)
    .populate('comment')
    .exec(function (err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

caracteristiqueController.getCaracteristiqueById = function (id) {
  let deferred = Q.defer();
  Caracteristique.findById(id)
    .populate('comment')
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

caracteristiqueController.updateCaracteristique = function (id, data) {
  let deferred = Q.defer();
  Caracteristique.findByIdAndUpdate(id, { $set: data }, { new: true })
    .populate('comment')
    .exec(function (err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

caracteristiqueController.deleteCaracteristique = function (id) {
  let deferred = Q.defer();
  Caracteristique.findByIdAndRemove(id)
    .populate('comment')
    .exec(function (error, result) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

module.exports = caracteristiqueController;