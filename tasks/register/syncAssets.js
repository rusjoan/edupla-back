module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'stylus:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
