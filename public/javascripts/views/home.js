/**
 * Created by Tserkovniy on 16.02.14.
 */
define([
    'backbone',
    'jquery',
    'jade!../../templates/home'
], function(Backbone, $, HomeTpl){
    var AppView = Backbone.View.extend({
        initialize: function () {
            this.render();
            // deffered set elements for workable event-bindings
            this.setElement('#page-start');
        },

        events: {
            'click .login': 'goLogin',
            'click .register': 'goRegister'
        },

        template: HomeTpl,

        render: function () {
            $('#app').html(this.template());
            return this;
        },

        goLogin: function (event) {
            event.preventDefault();
        },

        goRegister: function (event) {
            event.preventDefault();
        }
    });

    return AppView;
});