define([
    'backbone',
    'views/login',
    'views/registration',
    'models/user'
],
function(Backbone, LoginView, RegistrationView, UserModel){
    var AppRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            '': 'login',
            'login': 'login',
            'registration': 'registration'
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