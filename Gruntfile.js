module.exports = function(grunt) {
    // load all plugins at once
    require('load-grunt-tasks')(grunt);
    // without this line jshint doesn't work
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            js: {
                options: { livereload: true },
                files: ['public/javascripts/{,*/}*.js'],
                tasks: ['jshint']
            },
            jade: {
                options: { livereload: true },
                files: ['public/templates/{,*/}*.jade'],
            },
            less: {
                options: { livereload: true },
                files: ['public/stylesheets/{,*/}/*.less']
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            files: ['public/javascripts/{,*/}*.js', '!public/javascripts/vendor/*.js']
        },

        copy: {
            modernizr: {
                src: 'vendor/modernizr/modernizr.js',
                dest: 'public/javascripts/vendor/modernizr.js'
            },
            requirejs: {
                src: 'vendor/requirejs/require.js',
                dest: 'public/javascripts/vendor/require.js'
            },
            jquery: {
                src: 'vendor/jquery/jquery.js',
                dest: 'public/javascripts/vendor/jquery.js'
            },
            backbone: {
                src: 'vendor/backbone/backbone.js',
                dest: 'public/javascripts/vendor/backbone.js'
            },
            underscore: {
                src: 'vendor/underscore/underscore.js',
                dest: 'public/javascripts/vendor/underscore.js'
            },
            bootstrap: {
                src: 'vendor/bootstrap/dist/js/bootstrap.js',
                dest: 'public/javascripts/vendor/bootstrap.js'
            },
            'require-jade': {
                src: 'vendor/require-jade/jade.js',
                dest: 'public/javascripts/vendor/jade.js'
            }
        }
    });

    grunt.registerTask('default', ['watch']);
};