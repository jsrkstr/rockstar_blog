module.exports = function(grunt) {

    // list of all js to be concatenated and minfied
    var allJs = [
        "public/javascripts/jquery-1.8.2.min.js",
        "public/javascripts/jquery.mousewheel.min.js",
        "public/javascripts/underscore.js",
        "public/javascripts/backbone.js",
        "public/javascripts/app.js",
        "public/javascripts/collections/recent_posts.js",
        "public/javascripts/collections/posts.js",
        "public/javascripts/views/recent_post.js",
        "public/javascripts/views/post.js",
        "public/javascripts/views/archive.js",
        "public/javascripts/router/router.js"
    ];

    // list of all css and scss to be concatenated and compiled
    var allCss = [
        "public/vendor/Metro-UI-CSS/css/modern.css",
        "public/vendor/Metro-UI-CSS/css/modern-responsive.css",
        "public/vendor/Metro-UI-CSS/css/theme-dark.css",
        "public/stylesheets/app.css"
    ];


    // Project configuration.
    grunt.initConfig({

        allJs : allJs,

        pkg: {
            "name": "JSRockstar.in",
            "title": "JSRockstar.in",
            "description": "JSRockstar's Blog",
            "version": "0.1",
            "homepage": "http://jsrockstar.in"
        },

        meta : {

            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %>; */',

            // js for dev env
            loadAll : [
                "var allJs = '<%= allJs %>'.split(',');",
                "var sIndex = 0;",
                "function getS(){",
                    "if(sIndex < allJs.length){",
                        "s = document.createElement('script');",
                        "s.setAttribute('src', allJs[sIndex].replace('public', ''));",
                        "s.onload = getS;",
                        "document.head.appendChild(s);",
                        "sIndex++;",
                    "}",
                "};",
                "getS();"
            ].join("\n")

        },


        // Lists of files to be concatenated, used by the "concat" task.
        concat: {

            dev : {
                src: ['<banner:meta.banner>','<banner:meta.loadAll>'],
                dest: "public/build/javascripts/custom.js"
            },

            css : {
                src : allCss,
                dest: "public/build/css/temp/custom.scss"
            }

        },

        // Lists of files to be minified, used by the "min" task.
        min : {

            prod : {
                src : ['<banner:meta.banner>'].concat(allJs),
                dest : "public/build/javascripts/custom.js"
            }

        },

        
        less: {

            dev: {
                options: {
                  paths: [],
                  compress : true
                },
                files: {
                  "public/build/stylesheets/custom.css": allCss
                }
            }

        },


        watch: {

            // scripts : {
            //     files: allJs,
            //     tasks: 'concat:dev'
            // },

            scss : {
                files: allCss,
                tasks: 'less:dev'
            }
        }

    });


    // Custom tasks
    grunt.registerTask('build:dev', 'concat:dev less:dev'); // local

    grunt.registerTask('build:prod', 'min:prod less:dev');

    grunt.registerTask('build', 'build:dev');

    grunt.loadNpmTasks('grunt-contrib-less');

};