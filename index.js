/* jshint node: true */
'use strict';

var path = require('path');
var stew = require('broccoli-stew');

module.exports = {
  name: 'ember-bootstrap-4',
  treeForStyles: function() {
    return stew.mv(bootstrapAssetPath('scss'), '.');
  },
  treeForVendor: function() {
    stew.mv(popperAssetPath('dist'), 'popper');
    return stew.mv(bootstrapAssetPath('dist/js'), 'bootstrap');
  },
  included: function(app) {
      app.import('vendor/popper/umd/popper.js');
      var plugins = (app.options.bootstrap || {}).plugins;
      if (Array.isArray(plugins)) {
        plugins.forEach(function(name) {
          app.import('vendor/bootstrap/umd/' + name + '.js');
        });
      } else if (typeof plugins === 'undefined' || plugins) {
        app.import('vendor/bootstrap/bootstrap.js');
      }
    }
};

function bootstrapAssetPath(which) {
  var bootstrapPath = require.resolve('bootstrap');
  return path.join(path.dirname(bootstrapPath), '../..', which);
}

function popperAssetPath(which) {
  var popperPath = require.resolve('popper.js');
  return path.join(path.dirname(popperPath), '../..', which);
}
