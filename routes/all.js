var routes   = require('../routes');
var filter   = require('./filter').filter;

var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/#/registration');
}

module.exports = function(app, passport) {
    // filter non-backbone requests
    // rewrite all non api and non-static requests
    app.get('/*', filter);

    app.get('/', routes.index);

    // API
    // ---
    app.post('/api/v1/registration',
        passport.authenticate('local-registration'),
        function (req, res) {
            var user = req.body.email;

            res.contentType('json');

            res.send(JSON.stringify({
                user: user,
                auth: true
            }));
        });

    app.post('/api/v1/login',
        function(req, res, next) {
            passport.authenticate('local-registration', function(err, user, info) {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.send({
                        user: req.body.email,
                        auth: false,
                        message: 'Authentication Failed'
                    });
                }
                return res.send({
                    user: req.body.email,
                    auth: true,
                    message : 'Authentication Succeeded'
                });
            })(req, res, next);
        });
};