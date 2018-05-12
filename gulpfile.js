const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')()

const libraries = [
	'./bower_components/jquery/dist/jquery.js',
	'./bower_components/bootstrap/dist/js/bootstrap.js',
	'./bower_components/velocity/velocity.js'
]
	
const scripts = [
	'./scripts/utilities/utilities.js',
	'./scripts/helpers/config.js',
	'./scripts/main.js'
]

gulp.task('sass', () => {
	return gulp.src('./css/style.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init({ loadMaps: true }))
		.pipe($.sass({
			outputStyle: 'expanded'
		}).on('error',  (error) => {
			this.emit('end')
			$.notify({
				title: "SASS ERROR",
				message: "line " + error.line + " in " + error.file.replace(/^.*[\\\/]/, '') + "\n" + error.message
			}).write(error)
		}))
		.pipe($.autoprefixer({
			browsers: ['last 6 versions']
		}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream())
})

gulp.task('libraries', () => {
	return gulp.src(libraries)
		.pipe($.plumber())
		.pipe($.uglify())
		.pipe($.concat('libraries.min.js'))
		.pipe(gulp.dest('./scripts/'))
})

gulp.task('script', () => {
	return gulp.src(scripts)
		.pipe($.plumber())
		.pipe($.sourcemaps.init({ loadMaps: true }))
		.pipe($.concat('bundle.min.js'))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('./scripts/'))
})

gulp.task('browsersync', () => {
	browserSync.init({
		server: "./"
	})
})

gulp.task('watch', () => {
	gulp.watch('./css/**/*.scss', ['sass'])
	gulp.watch(['./scripts/**/*.js', '!./scripts/bundle.min.js'], ['script'])
})

gulp.task('default', ['sass', 'libraries', 'script', 'browsersync', 'watch'])