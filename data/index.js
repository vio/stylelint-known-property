var properties  = require('./properties');
var _ = require('lodash');

var propertiesList = [].concat.apply([], Object.keys(properties).map(function (group) {
  return properties[group];
}));

module.exports = _.uniq(propertiesList);
