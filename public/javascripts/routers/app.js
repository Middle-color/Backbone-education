define([
    'backbone',
    'views/home',
    'views/login',
    'views/registration',
    'models/user'
],
function(Backbone, HomeView, LoginView, RegistrationView, UserModel){
    'use strict';

    var AppRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            '': 'home',
            'login': 'login',
            'registration': 'registration'
        },

        home: function () {
            new HomeView({
                model: new UserModel()
            });
        },

        login: function () {
            new LoginView({
                model: new UserModel()
            });
        },

        registration: function () {
            new RegistrationView({
                model: new UserModel()
            });
        }
    });

    return AppRouter;
});