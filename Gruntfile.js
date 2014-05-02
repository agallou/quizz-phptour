module.exports = function(grunt) {

    grunt.initConfig({

        clean: ["tmp/", 'dist/'],

        bower: {
            install: {
                options: {
                    copy: false
                }
            }
        },

        copy: {
          images: {
            files: [
              {expand: true, flatten: true, src: ['ressources/assets/images/logo.png'], dest: 'dist/'}
            ]
          },
          ghpage: {
            files: [
              {expand: true, flatten: true, src: ['static/CNAME'], dest: 'dist/'}
            ]
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
            options: {
                stdout: true
            },
            getSessions: {
                command: 'php bin/app build:variables tmp/variables.js'
            },
            indexDev: {
                command: 'php bin/app build:index dist/index.html'
            },
            indexProd: {
                command: 'php bin/app build:index --prod dist/index.html'
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

                    'ressources/assets/js/quizz.js'
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
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },

        watch: {
            scripts: {
                files: [ 'Gruntfile.js', 'ressources/assets/js/**'],
                tasks: ['default'],
                options: {
                    reload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('base', ['bower', 'html2js', 'shell:getSessions', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy:images']);

    grunt.registerTask('dev', ['clean', 'shell:indexDev', 'base']);
    grunt.registerTask('prod', ['clean', 'shell:indexProd', 'base', 'copy:ghpage']);

    grunt.registerTask('default', ['dev']);
    grunt.registerTask('push', ['prod', 'gh-pages']);

};
