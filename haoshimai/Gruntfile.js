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
		},

		jshint: {
			check: {
				src: ["app/controller/*.js"]
			}
		},
		uglify: {
			test: {
				files: {
					'trash/fuck1.js': 'app/controller/test.js',
					'trash/fuck2.js': 'app/controller/houseAddress.js',
					'trash/fuck3.js': 'app/controller/chat.js',
					'trash/fuck4.js': 'app/controller/mapSell.js',
					'trash/fuck5.js': 'app/controller/houseDetail.js',
					'trash/fuck6.js': 'app/controller/residenceDetail.js',
					'trash/fuck7.js': 'app/controller/residenceOnSell.js',
					'trash/fuck8.js': 'app/controller/residenceSearch.js'
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
};