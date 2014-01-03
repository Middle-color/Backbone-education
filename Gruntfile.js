module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>',

        path: {
            app: 'app',
            js: '<%= path.app %>/js',
            less: '<%= path.app %>/less',
            html: '<%= path.app %>/*.html',
            bower: 'bower_components'
        },

        jshint: {
            options: {
                curly: true,
                eqnull: true,
                eqeqeq: true,
                undef: true,
                browser: true,
                globals: {
                    app: true,
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
            js: ['<%= path.js %>/**/*.js']
        },

        concat: {
            options: {
                separator: ';',
            },
            vendor: {
                src: [
                    '<%= path.bower %>/jquery/jquery.js',
                    '<%= path.bower %>/underscore/underscore.js',
                    '<%= path.bower %>/backbone/Backbone.js',
                    '<%= path.bower %>/bootstrap/dist/js/bootstrap.js'
                ],
                dest: 'public/js/vendor.js',
            },
            js: {
                src: [
                    '<%= path.js %>/views/appView.js',
                    '<%= path.js %>/appBootstrap.js'
                ],
                dest: 'public/js/app.js',
            },
            css: {
                src: [
                    '<%= path.bower %>/bootstrap/dist/css/bootstrap.css',
                    '<%= path.bower %>/bootstrap/dist/css/bootstrap-theme.css'
                ],
                dest: 'public/css/vendor.css',
            }
        },

        copy: {
            html: {
                src: '<%= path.app %>/index.html',
                dest: 'public/index.html'
            }
        },

        clean: ['public'],

        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: ['<%= jshint.gruntfile %>'],
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: ['<%= jshint.js %>'],
                tasks: ['jshint:js', 'concat:js']
            },
            html: {
                files: ['public/index.html'],
                tasks: []
            }
        }
    });

    grunt.registerTask('default', ['clean', 'copy', 'concat', 'watch']);
};