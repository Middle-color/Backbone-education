var routes   = require('../routes');
var filter   = require('./filter').filter;

var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/#/registration');
}

module.exports = function(app, passport) {
    // filter non-backbone requests
    app.get('/*', filter);

    app.get('/', routes.index);

    // API
    // ---
    app.post('/api/v1/registration',
        function(req, res, next) {
            passport.authenticate('local-registration', function(err, user, info) {
                if (err) {
                    return res.send({
                        error: err
                    });
                }
                if (!user) {
                    return res.send({
                        status: 401,
                        message: info.message
                    });
                }
                return res.send({
                    status: 201,
                    redirect: 'login',
                    message: info.message
                });
            })(req, res, next);
        });

    app.post('/api/v1/login',
        function(req, res, next) {
            passport.authenticate('local-login', function(err, user, info) {
                if (err) {
                    return res.send({
                        error: err
                    });
                }
                if (!user) {
                    return res.send({
                        status: 401,
                        message: info.message
                    });
                }
                return res.send({
                    status: 200,
                    redirect: '',
                    message: info.message
                });
            })(req, res, next);
        });
};