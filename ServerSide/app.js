let express = require('express');
let path = require('path');
let mongoose = require('./config/mongoose');
let db = mongoose();
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let authentificationMiddleware = require('./middlewares/authentification');
let sign = require('./routes/sign');
let user = require('./routes/userRoutes');
let admin = require('./routes/admin');
let caracteristique = require('./routes/caracteristiqueRoutes');
let test = require('./routes/test');
let commentaire = require('./routes/commentaireRoutes');
let userr = require('./routes/userRoutes');
let map = require('./routes/mapRoutes');


let app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
});

app.use('/test', test);
app.use('/sign', sign);
app.use(authentificationMiddleware.verifyToken);
app.use('/map', map);
app.use('/commentaire', commentaire);
app.use('/caracteristique', caracteristique);
app.use('/user', authentificationMiddleware.verifyAdmin, user);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;