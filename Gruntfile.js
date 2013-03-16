module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
        options: {
            boss: true,
            browser: true,
            expr: true,
            eqnull: true,
            latedef: true,
            newcap: false,
            node: true,
            strict: false,
            supernew: true,
            sub: true,
            trailing: true,
            undef: true
        },

        src: ['backbone.js'],
        node: ['index.js']
    },

    uglify: {
      all: {
        files: {
          'backbone-min.js': ['backbone.js']
        },
        options: {
          banner: '// Backbone.js <%= pkg.version %>\n\n' +
                  '// (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.\n' +
                  '// Backbone may be freely distributed under the MIT license.\n' +
                  '// For all details and documentation:\n'+
                  '// http://backbonejs.org\n',
          sourceMap: "backbone-min.map",
          beautify: {
            ascii_only: true
          }
        }
      }
    },

    qunit: {
      all: ['test/**/index.html']
    },

    docco: {
      annotated: {
        src: ['backbone.js', 'examples/todos/todos.js', 'examples/backbone-localstorage.js'],
        options: {
          output: 'docs/'
        }
      }
    },

    coffee: {
      tests: {
        expand: true,
        cwd: 'test',
        src: ['*.coffee'],
        dest: 'test/compiled/',
        ext: '.js'
      }
    },

    clean: ['test/compiled'],

    watch: {
      src: {
        files: ['backbone.js', 'test/*.js', 'test/coffee.js'],
        tasks: ['coffee', 'jshint', 'qunit', 'clean', 'uglify']
      }
    }

  });

  grunt.registerTask('test', ['jshint', 'coffee', 'qunit', 'clean']);
  grunt.registerTask('release', ['test', 'docco', 'uglify']);

  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
};

