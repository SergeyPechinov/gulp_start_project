'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		pug = require('gulp-pug'),
		concatCss = require('gulp-concat-css'),
		browserSync = require('browser-sync').create();

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './build',
		}
	});
	browserSync.watch('build', browserSync.reload);
});

gulp.task('pug', function () {
	return gulp.src('src/pug/**/*.pug')
			.pipe(pug({
				pretty: true,
			}))
			.pipe(gulp.dest('build'));
});

gulp.task('sass', function () {
	return gulp.src('src/scss/**/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('src/css'))
});

gulp.task('concatCss', function () {
	return gulp.src('src/css/**/*')
			.pipe(concatCss('css/css.css'))
			.pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('src/css/**/*', gulp.series('concatCss'));
});

gulp.task('default', gulp.series(
	gulp.parallel('watch', 'server')
));
