module.exports = function(grunt) {
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	
	bower: {
	    install: {
		options: {
		    install: true,
		    copy: false,
		    targetDir: 'dist/bower_components',
		    cleanTargetDir: true
		}
	    }
	},

	uglify: {
	    dist: {
		files: {
		    'dist/app.js': [ 'dist/app.js' ]
		},
		options: {
		    mangle: false
		}
	    }
	},
	
	html2js: {
	    options:{
		module: 'templates',
		base: 'app',
		singleModule: true
	    },
	    dist: {
		src: [ 'app/templates/*.html' ],
		dest: 'tmp/templates.js'
	    }
	},
	
	clean: {
	    temp: {
		src: [ 'tmp' ]
	    },
	    
	    dist: {
		src: [ 'dist' ]
	    }
	},

	concat: {
	    options: {
		separator: ';'
	    },
	    dist: {
		src: [ 'tmp/bower_concat.js', 'app/*.js', 'tmp/templates.js' ],
		dest: 'dist/app.js'
	    }
	},

	jshint: {
	    all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
	},
	
	compress: {
	    dist: {
		options: {
		    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
		},
		files: [{
		    src: [ 'index.html' ],
		    dest: '/'
		}, {
		    src: [ 'dist/**' ],
		    dest: 'dist/'
		}, {
		    src: [ 'assets/**' ],
		    dest: 'assets/'
		}, {
		    src: [ 'libs/**' ],
		    dest: 'libs/'
		}]
	    }
	},

	connect: {
	    server: {
		options: {
		    hostname: 'localhost',
		    port: 8080
		}
	    }
	},

	watch: {
	    dev: {
		files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
		tasks: [ 'jshint', 'html2js:dist', 'bower_concat:all', 'concat:dist', 'clean:temp' ],
		options: {
		    atBegin: true
		}
	    },
	    min: {
		files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
		tasks: [ 'jshint', 'html2js:dist', 'bower_concat:all', 'concat:dist', 'clean:temp', 'uglify:dist' ],
		options: {
		    atBegin: true
		}
	    }
	},

	bower_concat: {
	    all: {
		dest: 'tmp/bower_concat.js'
	    }
	},

	useminPrepare: {
	    html: 'index.html',
	    options: {
		dest: 'dist'
	    }
	},
	
	usemin: {
	    html: ['build/index.html']	    
	},

	copy: {
	    index: {
		src: 'index.html',
		dest: 'build/index.html'
	    }
	}
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    
    grunt.registerTask('dev', [ 'bower', 'bower_concat:all', 'connect:server', 'watch:dev' ]);
    grunt.registerTask('check', [ 'bower', 'jshint' ]);
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
    grunt.registerTask('compile', [ 'bower', 'jshint', 'html2js:dist', 'bower_concat:all', 'concat:dist', 'uglify:dist',
				    'clean:temp' ]);
    grunt.registerTask('package', [ 'bower', 'jshint', 'html2js:dist', 'bower_concat:all', 'concat:dist', 'uglify:dist',
				    'clean:temp', 'compress:dist' ]);

    grunt.registerTask('new' , ['copy:index', 'useminPrepare', 'concat', 'cssmin', 'uglify','usemin']);
};
