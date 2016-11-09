module.exports = function (grunt) {

	var config = {
		paths: {
			nodeModules: 	'./node_modules/',
			development: 	'./app/',
			production: 	'./public/'
		}
	}

	grunt.initConfig({
		config: config,

		pkg: grunt.file.readJSON('package.json'),

		'http-server': {
			'dev': {
				root: config.paths.production,
				port: '<%= pkg.http.port %>',
				host: '<%= pkg.http.host %>',
				showDir : true,
				autoIndex: true,
				defaultExt: "html",
				runInBackground: false
			}
		},

		watch: {
			js: {
				files: ['<%= config.paths.development %>js/*.js'],
				tasks: ['build']
			},
			scss: {
				files: ['<%= config.paths.development %>styles/**'],
				tasks: ['build']
			},
			html: {
				files: [
					'<%= config.paths.development %>pages/*.html',
					'<%= config.paths.development %>partials/*.html'
				],
				tasks: ['build']
			}
		},

		uglify: {
			options: {
				compile: true,
				compress: false
			},
			application: {
				files: {
					'<%= config.paths.production %>assets/js/bundle.js': [
						'<%= config.paths.nodeModules %>jquery/dist/jquery.js',
						'<%= config.paths.nodeModules %>moment/moment.js',
						'<%= config.paths.nodeModules %>bootstrap/dist/js/bootstrap.js',
						'<%= config.paths.nodeModules %>owl.carousel/dist/owl.carousel.js',
						'<%= config.paths.nodeModules %>jquery-match-height/dist/jquery.matchHeight.js',
						'<%= config.paths.nodeModules %>eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
						'<%= config.paths.nodeModules %>chosen-js/chosen.jquery.js',
						'<%= config.paths.development %>js/app.js'
					]
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= config.paths.production %>assets/css/bundle.css': '<%= config.paths.development %>styles/app.scss'
				}
			}
		},

		includes: {
			files: {
				src: 		'./*.html',
				dest: 		config.paths.production,
				flatten: 	true,
				cwd: 		config.paths.development + 'pages/',
				options: {
					silent: true
				}
			}
		},

		copy: {
			chosenJS: {
				src: '<%= config.paths.nodeModules %>chosen-js/chosen.css',
				dest: '<%= config.paths.development %>styles/vendor/chosen.scss'
			},
			bootstrapFonts: {
				expand: true,
  			flatten: true,
  			filter: 'isFile',
				src: '<%= config.paths.nodeModules %>bootstrap/fonts/**',
				dest: '<%= config.paths.production %>assets/fonts/bootstrap'
			}
		}
	});

	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-includes');

	grunt.registerTask('server', 			['http-server']);
	grunt.registerTask('build', 			['copy', 'includes', 'uglify', 'sass', 'watch']);

};
