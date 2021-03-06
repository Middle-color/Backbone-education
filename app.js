
/**
 * Module dependencies.
 */

var express  = require('express');
var http     = require('http');
var path     = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var configDB = require('./config/database.js');


var app = express();
mongoose.connect(configDB.url);
require('./config/passport')(passport);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Make jade pretty
app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('ilovescotchscotchyscotchscotch'));
app.use(express.session('ilovescotchscotchyscotchscotch'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// livereload
/*app.use(require('connect-livereload')({
    port: 35729
}));*/

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/all')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
