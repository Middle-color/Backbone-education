require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: 'vendor/jquery',
        backbone: 'vendor/backbone',
        underscore: 'vendor/underscore',
        bootstrap: 'vendor/bootstrap',
        jade: 'vendor/jade'
    }
});

require([
    'backbone',
    'routers/app'
], function (Backbone, AppRouter) {
    new AppRouter();

    Backbone.history.start({
        pushState: true
    });
});