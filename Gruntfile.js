module.exports = function(grunt) {
	grunt.initConfig({
		clean: ["test/**"],
		copy: {
			test: {
				files: [{
					src: "crunchie.js",
					dest: "test/"
				}, {
					src: "crunchie-test.js",
					dest: "test/"
				}]
			}
		},
		nodeunit: {
			all: ["test/*-test.js"]
		}
	});
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.registerTask("test", ["clean", "copy", "nodeunit"]);
	grunt.registerTask("default", ["test"]);
};