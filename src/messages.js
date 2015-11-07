var util = require('util');

var messages = {
  unknown: 'Unknown property \'%s\'.',
  blacklisted: 'Blacklisted property \'%s\'.'
};

module.exports = function (type, prop) {
  return util.format(messages[type], prop);
}
