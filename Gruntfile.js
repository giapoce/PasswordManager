module.exports = function(grunt){

 grunt.initConfig({
 pkg: grunt.file.readJSON('package.json'),
 watch: {
	 js: {
	 files: [
		 'assets/js/**/*.js',
		 '!assets/js/build/*.js',
		 '!assets/js/**/*.annotated.js'
         ],
 	tasks: ['ngAnnotate']
 },
 annotated: {
	 files: [
		 'assets/js/**/*.annotated.js',
	 ],
	 tasks: ['uglify']
 },
 less: {
	 files: [
	 'assets/less/*.less'
 	  ],
	 tasks: ['less:dev']
 },
 css: {
 	files: [
	 'assets/css/bootstrap.css'
	 ],
 	options: {
	 livereload: true
	 }
 	}
 },
 uglify: {

   options: {
   banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'

},
 build: {
 src: [
		 'assets/js/vendor/*.js',
		 'assets/js/**/*.annotated.js'
	 ],
		 dest: 'assets/js/build/<%= pkg.name %>.js'
 	}
 },
 less: {
	 dev: {
 	files: {
		 'assets/css/bootstrap.css':
		 'assets/less/bootstrap.less'
 	}
 },
 production: {
	 options: {
 	 cleancss: true
	 },
	 files: {
		 'assets/css/bootstrap.css':
		 'assets/less/bootstrap.less'
 	}
 	}
 },
 ngAnnotate: {
	 options: {
		 remove: true,
		 add: true,
		 singleQuotes: true
	 },
 app: {
	 src: [
	 'assets/js/**/*.js',
	 '!assets/js/**/*.annotated.js',
	 '!assets/js/vendor/*.js',
	 '!assets/js/build/*.js'
 	],
 expand: true,
	 ext: '.annotated.js',
	 extDot: 'last'
 	}
    }
 });

 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-contrib-less');
 grunt.loadNpmTasks('grunt-ng-annotate');
 grunt.registerTask('default', ['ngAnnotate', 'uglify']);

};
