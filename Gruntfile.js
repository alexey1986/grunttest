module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'src/scripts/*.js',
        dest: 'build/scripts/all.min.js'
      }
    },
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					src: ['src/**/base.scss'],
					dest: 'build/styles/style.css'
				}]
			}
		},
		copy: {
			main: {
				expand: true,
				cwd: 'src',
				src: '**/index.html',
				dest: 'build/'
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: {
						path: 'build',
						options: {
							index: 'index.html'
						}
					}
				}
			}
		},
		open: {
			all: {
				path: 'http://localhost:8000'
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['uglify'],
				options: {
					event: ['all']
				}
			},
			css: {
				files: 'src/**/*.scss',
				tasks: ['sass'],
				options: {
					event: ['all'],
					livereload: true
				}
			},
			configFiles: {
				files: [ 'Gruntfile.js'],
				options: {
					reload: true
				}
			}
		}
	});

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('run', ['uglify', 'sass', 'copy', 'connect', 'open' ,'watch']);

};