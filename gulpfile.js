"use strict"
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var mergeStream = require('merge-stream');

 
var buildPath = "target/gulp";
var opencastSrc = "../opencast";
//var paellaBunleSrc = opencastSrc + "/modules/engage-paella-player";
//var paellaBunleSrc = "node_modules/paellaplayer";
//var paellaSrc = paellaBunleSrc + "src/main/paella-opencast"
var editorSrc = "src/main/paella-opencast"



///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('paella-editor-opencast:prepare:source', function(){
	var s1 = gulp.src('node_modules/paella-editor/**').pipe(gulp.dest(buildPath + '/paella-editor'));	
	var s2 = gulp.src(editorSrc + '/plugins-editor/**').pipe(gulp.dest(buildPath + '/paella-editor/plugins'));
	
	return mergeStream(s1,s2);
});

gulp.task('paella-editor-opencast:prepare', ['paella-editor-opencast:prepare:source'], function(cb){
	var cmd_npm = spawn('npm', ['install'], {cwd: buildPath + '/paella-editor', stdio: 'inherit'});
	cmd_npm.on('close', function (code) {
		cb(code);
	});	
});

gulp.task('paella-editor-opencast:compile', ['paella-editor-opencast:prepare'], function(cb){
	var cmd_npm = spawn('node', ['node_modules/gulp/bin/gulp.js', 'editorFiles'], {cwd: buildPath + '/paella-editor'/*, stdio: 'inherit'*/});
	cmd_npm.on('close', function (code) {
		cb(code);
	});	
});


gulp.task('paella-editor-opencast:build', ["paella-editor-opencast:compile"], function(){
	return gulp.src([
		//paellaBunleSrc + "/" + buildPath + '/paella/build/player/**',
		'node_modules/paellaplayer/build/player/**',
		buildPath + '/paella-editor/build/editor-files/**',
		//paellaSrc + '/ui/**',
		editorSrc + '/ui/**'
		
	]).pipe(gulp.dest(buildPath + '/paella-editor-opencast'));	
});



gulp.task('default', ['paella-editor-opencast:build']);	


