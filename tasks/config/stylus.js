/**
 * Compiles Stylus files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.styl` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-stylus
 */
module.exports = function(grunt) {

	grunt.config.set('stylus', {
		dev: {
			files: [{
				expand: true,
				cwd: 'assets/styles/',
				src: ['importer.styl'],
				dest: '.tmp/public/styles/',
				ext: '.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
};
