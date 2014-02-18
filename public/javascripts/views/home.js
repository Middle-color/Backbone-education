define([
    'backbone',
    'jquery',
    'app',
    'jade!../../templates/home'
], function(Backbone, $, app, HomeTpl){
    'use strict';

    var AppView = Backbone.View.extend({

        initialize: function () {
            this.render();
            // deffered set elements for workable event-bindings
            this.setElement('#page-start');
        },

        events: {
            'click .login': 'goLogin',
            'click .register': 'goRegisteration'
        },

        template: HomeTpl,

        render: function () {
            $('#app').html(this.template());
            return this;
        },

        goLogin: function (event) {
            event.preventDefault();
            app.router.navigate('login', true);
        },

        goRegisteration: function (event) {
            event.preventDefault();
            app.router.navigate('registration', true);
        }
    });

    return AppView;
});