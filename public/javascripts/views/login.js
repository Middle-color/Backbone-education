define([
    'backbone',
    'jquery',
    'app',
    'jade!../../templates/login'
], function(Backbone, $, app, LoginTpl){
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

            // this.model.set({
            //     login: login,
            //     password: password
            // }, {
            //     validate: true
            // });
            $.ajax({
                type: 'POST',
                url: '/api/v1/login',
                data: {
                    email: login,
                    password: password
                },
                success: function (resp) {
                    if (resp.error) return new Error(resp.error);

                    if (resp.status && resp.status === 200 && typeof resp.redirect === 'string') {
                        app.router.navigate(resp.redirect, true);
                    }
                },
                error: function (resp) {
                    throw new Error('501: Server internal error');
                }
            });
        }
    });

    return AppView;
});