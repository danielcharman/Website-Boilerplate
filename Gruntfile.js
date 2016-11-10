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
				files: [
					'<%= config.paths.development %>jsx/app.jsx'
				],
				tasks: ['babel', 'concat']
			},
			scss: {
				files: ['<%= config.paths.development %>styles/**'],
				tasks: ['sass']
			},
			html: {
				files: [
					'<%= config.paths.development %>pages/*.html',
					'<%= config.paths.development %>partials/*.html'
				],
				tasks: ['includes']
			}
		},

		concat: {
			options: {
				stripBanners: true
			},
			application: {
				src: [
					'<%= config.paths.nodeModules %>react/dist/react.js',
					'<%= config.paths.nodeModules %>react-dom/dist/react-dom.js',
					'<%= config.paths.nodeModules %>jquery/dist/jquery.js',
					'<%= config.paths.nodeModules %>moment/moment.js',
					'<%= config.paths.nodeModules %>bootstrap/dist/js/bootstrap.js',
					'<%= config.paths.nodeModules %>owl.carousel/dist/owl.carousel.js',
					'<%= config.paths.nodeModules %>jquery-match-height/dist/jquery.matchHeight.js',
					'<%= config.paths.nodeModules %>eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
					'<%= config.paths.nodeModules %>chosen-js/chosen.jquery.js',
					'<%= config.paths.production %>assets/js/app.js'
				],
				dest: '<%= config.paths.production %>assets/js/bundle.js',
			}
		},

		babel: {
			options: {
				sourceMap: false,
				presets: ['react', 'es2015', 'stage-0']
			},
			dist: {
				files: {
					'<%= config.paths.production %>assets/js/app.js': '<%= config.paths.development %>jsx/app.jsx'
				}
			}
		},

		sass: {
			dist: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},
				files: {
					'<%= config.paths.production %>assets/css/bundle.css': '<%= config.paths.development %>styles/app.scss'
				}
			}
		},

		includes: {
			files: {
				src: './*.html',
				dest: config.paths.production,
				flatten: true,
				cwd: config.paths.development + 'pages/',
				options: {
					silent: true
				}
			}
		},

		copy: {
			chosenJS: {
				src: '<%= config.paths.nodeModules %>chosen-js/chosen.css',
				dest: '<%= config.paths.development %>styles/components/_chosen.scss'
			},
			bootstrapFonts: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: '<%= config.paths.nodeModules %>bootstrap/fonts/**',
				dest: '<%= config.paths.production %>assets/fonts/bootstrap'
			},
			fontAwesomeFonts: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: '<%= config.paths.nodeModules %>font-awesome/fonts/**',
				dest: '<%= config.paths.production %>assets/fonts'
			}
		},

		clean: {
		  preClean: [
		  	'<%= config.paths.production %>assets/css/**',
			  '<%= config.paths.production %>assets/js/**',
			  '<%= config.paths.production %>*.html'
		  ],
		  postClean: [
		  	'<%= config.paths.production %>assets/js/app.js'
		  ]
		}
	});

	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('build', [
		'clean:preClean',
		'copy',
		'includes',
		'babel',
		'concat',
		'sass',
		'clean:postClean',
		'watch'
	]);

};
