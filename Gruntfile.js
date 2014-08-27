module.exports = function(grunt) {
	grunt.initConfig({
		clean: ["test/**"],
		connect: {
			test: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('./test')
						];
					},
					hostname: "0.0.0.0"
				},
			}
		},
		copy: {
			test: {
				files: [{
					src: "crunchie.js",
					dest: "test/"
				}, {
					src: "crunchie-test.js",
					dest: "test/"
				}, {
					src: "test.html",
					dest: "test/test.html"
				}, {
					src: "node_modules/jquery/dist/jquery.min.js",
					dest: "test/jquery.js"
				}, {
					src: "node_modules/qunitjs/qunit/qunit.js",
					dest: "test/qunit.js"
				}, {
					src: "node_modules/qunitjs/qunit/qunit.css",
					dest: "test/qunit.css"
				}, {
					src: "node_modules/underscore/underscore.js",
					dest: "test/underscore.js"
				}]
			}
		},
		qunit: {
			all: {
				options: {
					urls: ["http://localhost:8000/test.html"]
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			copy: {
				files: ["crunchie*", "test.hmtl"],
				tasks: "copy"
			},
			qunit: {
				files: ["test/**/*"],
				tasks: "qunit"
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("test", ["clean", "copy", "connect", "qunit", "watch"]);
	grunt.registerTask("default", ["test"]);
};