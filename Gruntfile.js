module.exports = function(grunt) {
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	bower: {
	    install: {
		options: {
		    install: true,
		    copy: false,
		    targetDir: './libs',
		    cleanTargetDir: true
		}
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


    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('test', [ 'bower' ]);
};
