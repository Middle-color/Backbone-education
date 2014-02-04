define([
    'backbone',
    'views/login',
    'models/user'
],
function(Backbone, LoginView, UserModel){
    var AppRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            '': 'login',
            'login': 'login'
        },

        login: function () {
            new LoginView({
                model: new UserModel()
            });
        }
    });

    return AppRouter;
});