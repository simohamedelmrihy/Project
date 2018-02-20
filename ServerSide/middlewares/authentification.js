let jwt = require('jsonwebtoken');
let events = require ('events');
let authentification = new events.EventEmitter();

authentification.verifyToken = (req, res, next) => {
  let token = undefined;
  if (req.query.token)
    token = req.query.token;
  if (token) {
    jwt.verify(token, "secret", function (error, decoded) {
      if (error) {
        res.status(401).json({
          error: error
        });
      } else {
        req.auth = decoded;
        console.log('************', req.auth);
        next();
      }
    });
  } else {
    res.status(401).send({});
  }
};

authentification.verifyAdmin = (req, res, next) => {
  if(req.auth.role === "admin"){
    next();
  }else{
    res.status(401).send({message: "pas le droit"});
  }
};

module.exports = authentification;