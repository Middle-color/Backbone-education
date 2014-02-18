define([
    'backbone',
    'jquery',
    'jade!../../templates/registration'
], function(Backbone, $, LoginTpl){
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function () {
            this.render();
            // deffered set elements for workable event-bindings
            this.setElement('#page-login');
            this.$login = this.$el.find('.login');
            this.$password = this.$el.find('.password');
        },

        events: {
            'submit form': 'submit'
        },

        template: LoginTpl,

        render: function () {
            $('#app').html(this.template());
            return this;
        },

        submit: function (event) {
            event.preventDefault();
            var login = $.trim(this.$login.val()),
                password = this.$password.val();

            this.model.set({
                login: login,
                password: password
            }, {
                validate: true
            });
        }
    });

    return AppView;
});