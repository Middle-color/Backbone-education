define([
    'backbone'
],
function(Backbone){
    var UserModel = Backbone.Model.extend({
        defaults: {
            login: '',
            password: '',
            auth: false
        },

        validate: function(attrs) {
           console.log(attrs);
        }
    });

    return UserModel;
});