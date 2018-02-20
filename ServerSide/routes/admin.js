let express = require('express');
let jwt = require('jsonwebtoken');
let app = express();

app.use((req, res, next) => {
  let token = undefined;
  if (req.query.token)
    token = req.query.token;
  if (token) {
    jwt.verify(token, "secret", function (error, decoded) {
      if (error) {
        res.status(401).json({
          error: error
        });
      } else if(decoded.role === "admin"){
        req.auth = decoded;
        next();
      }else{
        res.status(401).send({});
      }
    });
  } else {
    res.status(401).send({});
  }
});


module.exports = app;