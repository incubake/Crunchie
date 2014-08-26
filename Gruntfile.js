module.exports = function(grunt) {
	grunt.initConfig({
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
					src: "node_modules/jquery/dist/jquery.min.js",
					dest: "test/jquery.js"
				}, {
					src: "node_modules/qunitjs/qunit/**/*",
					dest: "test/"
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
				files: ["crunchie*"],
				tasks: "copy"
			},
			qunit: {
				files: ["test/**/*"],
				tasks: "qunit"
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("test", ["copy", "connect", "qunit", "watch"]);
	grunt.registerTask("default", ["test"]);
};