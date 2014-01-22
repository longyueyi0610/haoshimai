module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		less: {
			framework: {
				files: {
					"app/assets/css/framework.css": "app/assets/less/framework.less"
				}
			}
		},
		watch: {
			less: {
				files: ["app/assets/less/*.less"],
				tasks: ['less']
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
};