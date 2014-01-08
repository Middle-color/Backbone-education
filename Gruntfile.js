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
            jade: '<%= path.app %>/*.jade',
            bower: 'bower_components'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: ['Gruntfile.js'],
            js: ['<%= path.app %>/**/*.js']
        },

        less: {
            development: {
                options: {
                    paths: ['<%= path.less %>/app.less']
                },
                files: {
                    "public/css/app.css": '<%= path.less %>/app.less'
                }
            }
        },

        jade: {
            compile: {
                options: {
                    pretty: true,

                    data: function(dest, src) {
                        var appjs = require('./public/output/appjs.json'),
                            appcss = require('./public/output/appcss.json');

                        var config = {
                            appjs : (appjs && appjs[0]) ? '.'+appjs[0].rev : '',
                            appcss : (appcss && appcss[0]) ? '.'+appcss[0].rev : ''
                        };


                        // Return an object of data to pass to template
                        return config;
                    }
                },
                files: {
                    "public/index.html": ["<%= path.app %>/index.jade"]
                }
            }
        },

        // running less, concat:js tasks withing assets_versioning task, adding versions
        assets_versioning: {
            // app.js versioning
            js: {
                options: {
                    use: 'hash',
                    hashLength: 8,
                    multitask: 'concat',
                    output : 'public/output/appjs.json',
                }
            },
            // app.css versioning
            development: {
                options: {
                    use: 'hash',
                    hashLength: 8,
                    multitask: 'less',
                    output : 'public/output/appcss.json',
                }
            }
        },

        concat: {
            options: {
                separator: ';\n\n',
            },
            vendor: {
                src: [
                    '<%= path.bower %>/jquery/jquery.min.js',
                    '<%= path.bower %>/underscore/underscore-min.js',
                    '<%= path.bower %>/backbone/Backbone-min.js',
                    '<%= path.bower %>/bootstrap/dist/js/bootstrap.min.js'
                ],
                dest: 'public/js/vendor.js'
            },
            js: {
                src: [
                    '<%= path.js %>/views/appView.js',
                    '<%= path.js %>/appBootstrap.js'
                ],
                dest: 'public/js/app.js'
            },
            css: {
                src: [
                    '<%= path.bower %>/bootstrap/dist/css/bootstrap.css',
                    '<%= path.bower %>/bootstrap/dist/css/bootstrap-theme.css'
                ],
                dest: 'public/css/vendor.css'
            }
        },

        clean: {
            "public" : ['public'],
            "js" : ['public/js/app*.js'],
            "css" : ['public/css/app*.css'],
            "html" : ['public/index.html'],
        },

        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: ['<%= jshint.gruntfile %>'],
                tasks: ['jshint:gruntfile']
            },
            css : {
                files: "<%= path.less %>/app.less",
                tasks: ['clean:css', 'assets_versioning:development']
            },
            js: {
                files: ['<%= jshint.js %>'],
                tasks: ['jshint:js', 'clean:js', 'assets_versioning:js']
            },
            html: {
                files: ['<%= path.app %>/index.jade'],
                tasks: ['clean:html', 'jade']
            }
        }
    });

    grunt.registerTask('compile', ['assets_versioning', 'concat:css', 'concat:vendor', 'jade']);

    grunt.registerTask('default', ['clean:public', 'compile', 'watch']);
};