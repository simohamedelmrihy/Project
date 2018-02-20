let Q = require('q');
let User = require('mongoose').model('users');
let events = require('events');
const bcrypt = require('bcrypt');
let userController = new events.EventEmitter();

userController.addUser = function (data) {
    let deferred = Q.defer();
    User.find({email: data.email}).exec()
      .then(user => {
        if(user.length >= 1){
            deferred.reject({error: "email already exists"});
        }else{
          bcrypt.hash(data.password, 10, (err, hash)=>{
            if(err){
                deferred.reject({error: "error bcrypt"});
            }else{
              const use = new User(data);
              use.save()
                  .then(result => {
                    deferred.resolve(result);
                  })
                  .catch(err => {
                    deffered.reject(err);
                  });
            }
          });
        }
      })
      .catch(err => {
        deffered.reject(err);
      });
    return deferred.promise;
};

userController.getUserByFilter = function (filter, pagination) {
    let deferred = Q.defer();
    let skip = 0;
    let limit = 20;
    if (pagination !== undefined && 'skip' in pagination && pagination.skip !== undefined)
        skip = parseInt(pagination.skip);
    if (pagination !== undefined && 'limit' in pagination && pagination.limit !== undefined)
        limit = parseInt(pagination.limit);
    if (limit > 100)
        limit = 100;
    User.find(filter).skip(skip).limit(limit)
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

userController.getUserById = function (id) {
    let deferred = Q.defer();
    User.findById(id)
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

userController.updateUser = function (id, data) {
    let deferred = Q.defer();
    User.findByIdAndUpdate(id, {$set: data}, {new: true})
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

userController.deleteUser = function (id) {
    let deferred = Q.defer();
    User.findByIdAndRemove(id)
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

module.exports = userController;