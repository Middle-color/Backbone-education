var urlFilterRegex = /^\/$|^\/(?:stylesheets|javascripts|images|templates|api)\//;

exports.filter = function(req, res, next) {
    var url = req.url;

    if (urlFilterRegex.test(url)) {
        next();
    } else {
        req.method = 'get';
        // redirect to Backbone router
        res.redirect(req.protocol + "://" + req.get('host') + '/#' + url);
    }
};