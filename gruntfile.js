// Gruntfile.js
module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
		    dist: '_site',
            assets: '_assets'
	    },

        sass: {
            dist: {
                options: {
                    includePaths: ['bower_components'],
    				outputStyle: 'expanded',
    				sourceMap: true
    			},
                files: [{
                    'styles/app.css': '<%= project.assets %>/styles/app.scss',
                    '<%= project.dist %>/styles/app.css': '<%= project.assets %>/styles/app.scss'
                }]
            }
        }, // sass

        postcss: {
            options: {
                map: true,
    			inline: false,
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 version, IE 9'
                    }), // add vendor prefixes. for more: https://github.com/ai/browserslist
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: [
                    '<%= project.dist %>/styles/app.css',
                    'styles/app.css'
                ]
            }
        }, // postcss

        bowercopy: {
			options: {
				clean: true
			},
			scripts: {
				options: {
					destPrefix: '<%= project.assets %>/scripts/vendor'
				},
				files: {
                    'jquery.js': 'jquery/dist/jquery.js',
					'enquire.js': 'enquire/dist/enquire.js',
                    'jquery.matchHeight.js': 'matchHeight/jquery.matchHeight.js',
                    'fastclick.js': 'fastclick/lib/fastclick.js',
                    'jquery.magnific-popup.js': 'magnific-popup/dist/jquery.magnific-popup.js',
                    'owl.carousel.js': 'owl.carousel/dist/owl.carousel.js',
                    'imagesloaded.pkgd.js': 'imagesloaded/imagesloaded.pkgd.js',
                    'autosize.js' : 'autosize/dist/autosize.js',
                    'wow.js' : 'wow/dist/wow.js',
                    'viewport-units-buggyfill.js' : 'viewport-units-buggyfill/viewport-units-buggyfill.js',
                    'webfontloader.js' : 'webfontloader/webfontloader.js'
				}
			},
            styles: {
				options: {
					destPrefix: '<%= project.assets %>/styles/vendor'
				},
				files: {
                    'animate.css': 'animate.css/animate.css',
                    'owl.carousel.css': 'owl.carousel/dist/assets/owl.carousel.css'
                }
            }
		}, // bowercopy

        manifest: {
            dist: {
                src: '<%= project.assets %>/scripts',
                dest: 'scripts'
            }
        }, // concat

        uglify: {
            dist: {
                src: 'scripts/app.js',
                dest: 'scripts/app.min.js'
            }
        }, // uglify

        copy: {
            styles: {
                files: [{
                    cwd: '<%= project.assets %>/styles',
                    src: 'fonts.css',
                    dest: 'styles/',
                    expand: true
                }]
            }
        },

        connect: {
    		options: {
    			port: 9000,
    			livereload: 35729,
    			// change this to '0.0.0.0' to access the server from outside
    			hostname: '0.0.0.0',
    			base: './_site'
    		},
    		livereload: {
    			options: {
    				open: true
    			}
    		},
    		server: {
    			options: {
    				port: 9001,
    				keepalive: true,
    				open: false
    			}
    		}
    	}, // connect

        watch: {
            options: {
    	  		livereload: true,
     	 	},
            jekyll: {
                files: [
                    '_layouts/*.html',
                    '_includes/*.html',
                    '_data/*.*',
                    'thoughts/**/*.*',
                    '*.html',
                ],
                tasks: ['shell:jekyllBuild']
            },
            sass: {
                options: {
    	  			livereload: false
    			},
                files: ['<%= project.assets %>/styles/**/*.scss'],
                tasks: ['sass']
            },
            css: {
    			files: ['<%= project.dist %>/styles/*.css'],
    			tasks: []
      		},
            scripts: {
                files: [
                  '<%= project.assets %>/scripts/**/*.js'
                ],
                tasks: ['manifest', 'uglify', 'shell:jekyllBuild']
            },
            manifest: {
                files: [
                  '<%= project.assets %>/scripts/**/*.json'
                ],
                tasks: ['manifest', 'uglify', 'shell:jekyllBuild']
            },
            images: {
                files: ['images/**/*'],
                tasks: ['shell:jekyllBuild']
            },
            icons: {
                files: ['<%= project.assets %>/icons/*.svg'],
                tasks: []
            }
        }, // watch

        // shell commands for use in Grunt tasks
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-manifest-concat');
    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.registerTask('build', [
      'bowercopy',
      'copy',
      'manifest',
      'uglify',
      'shell:jekyllBuild',
      'sass',
      'postcss'
    ]);

    grunt.registerTask('build-nj', [
      'bowercopy',
      'copy',
      'manifest',
      'uglify',
      'sass',
      'postcss'
    ]);

    grunt.registerTask('dev', [
      'connect:livereload',
      'watch'
    ]);

    grunt.registerTask('default', ['build', 'dev']);
};
