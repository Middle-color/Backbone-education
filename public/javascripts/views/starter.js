/**
 * Created by Tserkovniy on 16.02.14.
 */
define([
    'backbone',
    'jquery',
    'jade!../../templates/starter'
], function(Backbone, $, StarterTmpl){
    console.log(StarterTmpl());

    var AppView = Backbone.View.extend({
        initialize: function () {
            this.render();
            // deffered set elements for workable event-bindings
            this.setElement('#page-start');
            this.$login = this.$el.find('.login');
            this.$register = this.$el.find('.register');
        },

        events: {
            'click .login': 'goLogin',
            'click .register': 'goRegister'
        },

        template: StarterTmpl,

        render: function () {
            $('#app').html(this.template());
            return this;
        },

        goLogin: function (event) {
            console.log(this);
            // location.assign('login');
        },

        goRegister: function (event) {
            location.assign('register');
        }
    });

    return AppView;
});