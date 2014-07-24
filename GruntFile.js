module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        bower: 'bower_components/',
        dist: 'web/dist',
        web: 'web',
        pkg: grunt.file.readJSON('package.json'),
        clean:{
          dist:["<%= dist %>"]
        },
        replace: {
            readme: {
                src: ['README.md'],
                overwrite: true,
                replacements: [
                    {
                        from: /Version \d{1,1}\.\d{1,2}\.\d{1,2}/g,
                        to: 'Version <%= pkg.version %>'
                    }
                ]
            },
            sirtrevorwidget_php: {
                src: ['SirTrevorWidget.php'],
                overwrite: true,
                replacements: [
                    {
                        from: /\d{1,1}\.\d{1,2}\.\d{1,2}/g,
                        to: '<%= pkg.version %>'
                    }
                ]
            },
            asset_php: {
                src: ['assets/SirTrevorAsset.php'],
                overwrite: true,
                replacements: [
                    {
                        from: /dist\/styles\/yii2-sirtrevorjs-\d{1,1}\.\d{1,2}\.\d{1,2}/g,
                        to: 'dist/styles/yii2-sirtrevorjs-<%= pkg.version %>'
                    }
                ]
            },
            asset_php_js: {
                src: ['assets/SirTrevorAsset.php'],
                overwrite: true,
                replacements: [
                    {
                        from: /dist\/scripts\/yii2-sirtrevorjs-\d{1,1}\.\d{1,2}\.\d{1,2}/g,
                        to: 'dist/scripts/yii2-sirtrevorjs-<%= pkg.version %>'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'min',
                beautify: {
                    width: 80,
                    beautify: true
                },
                compress: {
                    drop_console:true
                }
            },
            vendor: {
                src: [
                    '<%= dist %>/scripts/lib/vendor-<%= pkg.name %>-<%= pkg.version %>.js',
                    '<%= dist %>/scripts/blocks-<%= pkg.name %>-<%= pkg.version %>.js'
                ],
                dest: '<%= dist %>/scripts/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    '<%= dist %>/styles/<%= pkg.name %>-<%= pkg.version %>.min.css': [ 'web/styles/*.css']
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
            locales: {
                files: [
                    {
                        expand: true,
                        cwd:'<%= bower %>/sir-trevor-js/locales',
                        src: ['**'],
                        dest: '<%= dist %>/scripts/locales',
                        filter: 'isFile'
                    }
                ]
            },
            styles: {
                files: [
                    {
                        expand: true,
                        cwd:'<%= bower %>/sir-trevor-js',
                        src: ['*.css'],
                        dest: '<%= web %>/styles',
                        filter: 'isFile'
                    }
                ]
            },
            vendor:{
                files:[
                    {
                        expand: true,
                        cwd: '<%= bower %>',
                        src: [
                            'underscore/underscore.js',
                            'Eventable/eventable.js',
                            'sir-trevor-js/sir-trevor.js'
                        ],
                        dest: '<%= web %>/scripts/lib',
                        filter: 'isFile'
                    }
                ]
            }

        },
        concat: {
            options: {
            },
            vendor: {
                src: [
                    '<%= bower %>/underscore/underscore.js',
                    '<%= bower %>/Eventable/eventable.js',
                    '<%= bower %>/sir-trevor-js/sir-trevor.js'
                ],
                dest: '<%= dist %>/scripts/lib/vendor-<%= pkg.name %>-<%= pkg.version %>.js'
            },
            blocks: {
                src: [
                    '<%= web %>/scripts/blocks/*',
                ],
                dest: '<%= dist %>/scripts/blocks-<%= pkg.name %>-<%= pkg.version %>.js'
            },

            css: {
                src: [
                    '<%= bower %>sir-trevor-js/sir-trevor.css',
                    '<%= bower %>sir-trevor-js/sir-trevor-icons.css'
                ],
                dest: '<%= dist %>/styles/<%= pkg.name %>-<%= pkg.version %>.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.event.on('watch', function (action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    grunt.registerTask('default', ['clean','copy', 'concat','uglify','cssmin']);
    grunt.registerTask('semantic', ['replace','default']);
    grunt.registerTask('min', ['uglify', 'cssmin']);

};
