module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        //Configuration for concatinating files goes here
        concat: {   
            dist: {
                src: [
                    'static/js/lib/analytics.js',
                    'static/js/lib/typekit.js',
                    'static/js/lib/jquery-1.11.0.min.js',
                    'static/js/lib/jquery.blockquote.tweet.js',
                    'static/js/lib/jquery.popup.js',
                    'static/js/lib/jquery.scrolltop.js',
                    'static/js/lib/jquery.photogrid.js',
                    'static/js/global.js',
                    ],
                dest: 'static/js/build/app.js',
            }
        },

        //Configuration for minifying JS files goes here (aka Uglify)
        uglify: {
            build: {
                src: 'static/js/build/app.js',      //The JS from the concatanation file above
                dest: 'static/js/build/app.min.js'  //The output file we will save it out to
            }
        },

        // Compass
        compass: {
            dist: {
                options: {
                    sassDir: 'assets/scss',
                    cssDir: 'static/css',
                    imagesDir: 'static/images',
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            },
            dev: {
                options: {
                    sassDir: 'assets/scss',
                    cssDir: 'static/css',
                    imagesDir: 'static/images',
                    outputStyle: 'compressed'
                }
            }
        },

        //Auto watch files/folders for fiel changes & run set tasks above
        watch: {

            //Setup config options for watch
            options: {
                livereload: true,               //Enable the liverelaod browser plugin
            },

            //This is just for JS Scripts
            scripts: {
                files: ['static/**/*.js'],        //Monitor files in the scripts folder with the js extension
                tasks: ['concat', 'uglify'],    //Run the JS concat followed by the minify aka uglify task
                options: {
                    spawn: false,
                }
            },

            //This is for the Compass compilation
            css: {
                files: ['assets/**/*.scss'],          //Monitor files in the css folder with the .scss extension
                tasks: ['compass'],                //Run the Sass task to compile & minify into CSS
                options: {
                    spawn: false,               //Don't fully understand this switch but its needed
                }
            }
        }     

    });

    // 3. Where we tell Grunt we plan to use this plug-in.

    //Concat JS Files
    grunt.loadNpmTasks('grunt-contrib-concat');

    //Minify JS files - aka Uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Sass to css compilation
    // grunt.loadNpmTasks('grunt-contrib-sass');

    //Sass to css compilation
    grunt.loadNpmTasks('grunt-contrib-compass');

    //Auto-Watch folders/files for changes on save. Re-runs tasks
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    //We will run concat first followed by JS minify (aka Uglify), then imagemin
    grunt.registerTask('default', ['concat', 'uglify', 'compass']);

};