define([
    'backbone',
    'views/login',
    'views/registration',
    'models/user',
    'jquery'
],
function(Backbone, LoginView, RegistrationView, UserModel, $){
    var AppRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            '': 'home',
            'login': 'login',
            'registration': 'registration'
        },

        home: function () {
            $('#app').text('Welcome home');
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