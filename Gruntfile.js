module.exports = function(grunt) {

    grunt.initConfig({

        clean: ["tmp/", 'dist/'],

        copy: {
            main: {
                files: [
                    {src: 'src/index.html', dest: 'dist/index.html'}
                ]
            }
        },

        bower: {
            install: {
                options: {
                    copy: false
                }
            }
        },

        html2js: {
            templates: {
                options: {
                    module: 'templates-quizz',
                    rename: function (moduleName) {
                        return 'templates/Quizz.html';
                    }

                },
                src: ['bower_components/quizz/src/templates/*.html'],
                dest: 'tmp/templates-quizz.js'
            }
        },

        shell: {
            getSessions: {
                options: {
                    stdout: true
                },
                command: 'php build.php > tmp/variables.js'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                nonull: true,
                src: [
                    'tmp/variables.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/showdown/src/showdown.js',

                    'bower_components/quizz/src/js/quizz-module-template.js',
                    'bower_components/quizz/src/js/controllers/*.js',
                    'bower_components/quizz/src/js/directives/*.js',

                    'tmp/templates-quizz.js',

                    'src/quizz.js'
                ],
                dest: 'dist/main.js'
            }
        },

        uglify: {
            main: {
                files: {
                    'dist/main.js': 'dist/main.js'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/main.css': 'bower_components/quizz/src/css/quizz.css'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['clean', 'bower', 'html2js', 'shell:getSessions', 'concat', 'copy', 'uglify', 'cssmin']);

};
