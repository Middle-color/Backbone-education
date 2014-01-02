module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        path: {
            app: 'app',
            js: '<%= path.app %>/js',
            less: '<%= path.app %>/less',
            html: '<%= path.app %>/*.html',
            bowerComponents: 'bower_components'
        },

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>',

        jshint: {
            options: {
                curly: true,
                eqnull: true,
                eqeqeq: true,
                undef: true,
                browser: true,
                globals: {
                    console: true,
                    _: true,
                    $: true,
                    jQuery: true,
                    Backbone: true,
                    module: true,
                    require: true,
                    define: true,
                    ENV: true
                }
            },
            gruntfile: ['Gruntfile.js'],
            app: ['<%= path.js %>/**/*.js']
        },

        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: ['<%= jshint.gruntfile %>'],
                tasks: ['jshint:gruntfile', 'watch']
            },
            app: {
                files: ['<%= jshint.app %>'],
                tasks: ['jshint:app']
            },
            html: {
                files: ['public/index.html'],
                tasks: []
            }
        }
    });

    grunt.registerTask('default', ['watch']);
};