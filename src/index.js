var util        = require('util');
var stylelint   = require('stylelint');
var report      = stylelint.utils.report;

var properties  = require('./data');
var ruleName    = 'known-property';
var propPattern = new RegExp('^-(webkit|moz|o|ms)-(.*)');

function reject (prop) {
  return util.format('Unknown property \'%s\'', prop);
}

function validateProp (prop) {
  prop = prop.replace(propPattern, function (matches, prefix, propName) {
    return propName;
  });

  return properties.indexOf(prop) === -1;
}

function validate (result) {
  return function (decl) {
    if (validateProp(decl.prop)) {
      report({
        message: reject(decl.prop),
        node: decl,
        result: result,
        ruleName: ruleName
      });
    }
  }
}

module.exports = function() {
  return function(root, result) {
    root.walkDecls(validate(result));
  };
};
