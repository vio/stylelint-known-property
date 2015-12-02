var properties  = require('./properties');

var propertiesList = [].concat.apply(Array, Object.keys(properties).map(function (group) {
  return properties[group];
}));

module.exports = propertiesList;
