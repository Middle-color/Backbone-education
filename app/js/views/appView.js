(function (document, window, $, Backbone, undefined) {

    'use strict';

    app.views.AppView = Backbone.View.extend({
        el: '#app',

        initialize: function () {
            this.render();
        },

        template: _.template('<div class="container"><form class="form-signin" role="form"><h2 class="form-signin-heading"><%= name %></h2><input type="text" class="form-control" placeholder="Email address" required autofocus><input type="password" class="form-control" placeholder="Password" required><button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button></form></div><!-- /.container -->'),

        render: function() {
            this.$el.html(this.template({name: 'Hello, please sign in'}));
            return this;
        }
    });

})(document, window, jQuery, Backbone);