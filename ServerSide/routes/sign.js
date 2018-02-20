const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', function(req, res, next) {
  User.find({email: req.body.email}).exec()
      .then(user => {
        if(user.length >= 1){
          return res.status(409).json({
            message: "email already exists"
          });
        }else{
          bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
              return res.status(500).json({
                error: err
              });
            }else{
              const user = new User({
                email: req.body.email,
                nom: req.body.nom,
                prenom: req.body.prenom,
                password: hash,
                role: "user"
              });
              user.save()
                  .then(result => {
                    console.log(user);
                    res.status(201).json({
                      message: "user created"
                    })
                  })
                  .catch(err => {
                    console.log(500);
                    res.status(500).json({
                      error: err
                    });
                  });
            }
          });
        }
      })
      .catch(err => {
        console.log(500);
        res.status(500).json({
          error: err
        });
      });
});

router.post("/login", (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length < 1){
        return res.status(401).json({
          message: 'Auth failed'
        });
      } 
      bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
        if(err){
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if(result){
          const token = jwt.sign({
            email: user[0].email,
            role: user[0].role,
            userId: user[0]._id
          }, "secret", 
          {
            expiresIn: "2h"
          });
          return res.status(200).json({
            message: 'Auth successful',
            token: token,
            role: user[0].role
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        });
      })
    })
    .catch(err => {
      console.log(500);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
