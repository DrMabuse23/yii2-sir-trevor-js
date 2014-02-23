module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'min'
            },
            complete: {
                src: [
                    '<%= bower %>underscore/underscore.js',
                    '<%= bower %>Eventable/eventable.js',
                    '<%= bower %>sir-trevor-js/sir-trevor.js'
                ],
                dest: '<%= dist %>/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    '<%= dist %>/<%= pkg.name %>-<%= pkg.version %>.min.css': [ '<%= bower %>sir-trevor-js/**/*.css']
                }
            }
        },
        bumpup: {
            options: {
                dateformat: 'YYYY-MM-DD HH:mm',
                normalize: false
            },
            files: ['package.json', 'composer.json','bower.json']
        },
        bower:  'bower_components/',
        dist:   'dist'
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    grunt.registerTask('default', ['uglify','cssmin']);

};
