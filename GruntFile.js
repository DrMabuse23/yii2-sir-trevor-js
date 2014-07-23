module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        bower: 'bower_components/',
        dist: 'assets/',
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'min',
                compress: true
            },
            complete: {
                src: [
                    '<%= dist %>/grunt/<%= pkg.name %>-<%= pkg.version %>.js',
                    '<%= dist %>/grunt/locales/*',
                    '<%= dist %>/blocks/*'
                ],
                dest: '<%= dist %>/grunt/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    '<%= dist %>/grunt/<%= pkg.name %>-<%= pkg.version %>.min.css': [ '<%= dist %>/grunt/*.css']
                }
            }
        },
        bumpup: {
            options: {
                dateformat: 'YYYY-MM-DD HH:mm',
                normalize: false
            },
            files: ['package.json', 'composer.json', 'bower.json']
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= bower %>/sir-trevor-js',
                        src: ['locales/**'],
                        dest: 'assets/grunt',
                        filter: 'isFile'
                    }
                ]
            }
        },
        concat: {
            options: {
            },
            js: {
                src: [
                    '<%= bower %>underscore/underscore.js',
                    '<%= bower %>Eventable/eventable.js',
                    '<%= bower %>sir-trevor-js/sir-trevor.js'
                ],
                dest: '<%= dist %>/grunt/<%= pkg.name %>-<%= pkg.version %>.js'
            },
            css: {
                src: [
                    '<%= bower %>sir-trevor-js/sir-trevor.css',
                    '<%= bower %>sir-trevor-js/sir-trevor-icons.css'
                ],
                dest: '<%= dist %>/grunt/<%= pkg.name %>-<%= pkg.version %>.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.event.on('watch', function (action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    grunt.registerTask('default', ['concat', 'copy']);
    grunt.registerTask('min', ['uglify', 'cssmin']);

};
