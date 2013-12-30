module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['public/index.html'],
                tasks: []
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};