define([
    'backbone',
    'views/starter',
    'views/login',
    'views/registration',
    'models/user'
],
function(Backbone, StarterView, LoginView, RegistrationView, UserModel){
    var AppRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            '': 'starter',
            'login': 'login',
            'registration': 'registration'
        },

        starter: function () {
            new StarterView({
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