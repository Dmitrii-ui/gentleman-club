const gulp = require('gulp')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const HTMLMinimizer = require('gulp-html-minimizer')
const rm = require('gulp-rm')
const { series } = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps')
const gulp_if = require('gulp-if')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const fonter = require('gulp-fonter')


const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'


gulp.task('clean', () => {
    return gulp.src('dist/**/*', {read: false}).pipe(rm())
})

gulp.task('critical', () => {
    return gulp.src('src/styles/critical/**/*.scss')
            .pipe(gulp_if(isDev, sourcemaps.init()))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(concat('critical.min.css'))
            .pipe(cleanCSS())
            .pipe(gulp_if(isDev, sourcemaps.write()))
            .pipe(gulp.dest('dist/styles'))
            .pipe(browserSync.reload({stream: true}))
})

gulp.task('async', () => {
    return gulp.src('src/styles/async/**/*.scss')
            .pipe(gulp_if(isDev, sourcemaps.init()))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(concat('async.min.css'))
            .pipe(cleanCSS())
            .pipe(gulp_if(isDev, sourcemaps.write()))
            .pipe(gulp.dest('dist/styles'))
            .pipe(browserSync.reload({stream: true}))
})

gulp.task('html', () => {
    return gulp.src('./**/*.html')
            .pipe(gulp_if(isProd, HTMLMinimizer({collapseWhitespace: true})))
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({stream: true}))
})

gulp.task('img', () => {
    return gulp.src('src/img/*')
            .pipe(
                webp({
                    quality: 70
                })
            )
            .pipe(gulp.dest('dist/img'))
            .pipe(gulp.src('src/img/*'))
            .pipe(
                imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    interlaced: true,
                    optimizationLevel: 3
                })
            )
            .pipe(gulp.dest('dist/img'))
})

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
            .pipe(concat('main.min.js'))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulp_if(isProd, uglify()))
            .pipe(gulp.dest('dist/js'))
            .pipe(browserSync.reload({stream: true})) 
})

gulp.task('fonts', () => {
    gulp.src('src/fonts/**/*')
        .pipe(ttf2woff())
        .pipe(gulp.dest('dist/fonts'));

    return gulp.src('src/fonts/**/*')
        .pipe(ttf2woff2())
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('otf2ttf', () => {
    return gulp.src('src/fonts/*.otf')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(gulp.dest('src/fonts'))

})

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
})

gulp.task('default', series('clean', 'html', 'fonts', 'critical', 'async', 'js', 'img', 'server'))

gulp.watch('src/**/*.scss', series('critical'))
gulp.watch('src/**/*.scss', series('async'))
gulp.watch('index.html', series('html'))
gulp.watch('src/**/*.js', series('js'))
gulp.watch('src/img/**/*', series('img'))