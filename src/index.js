var stylelint   = require('stylelint');
var report      = stylelint.utils.report;

var properties  = require('./data');
var messages    = require('./messages');
var ruleName    = 'known-property';
var propPattern = new RegExp('^-(webkit|moz|o|ms)-(.*)');

function reject(result, node, type) {
  report({
    message: messages(type, node.prop),
    node: node,
    result: result,
    ruleName: ruleName
  });
}

function validateProp (prop) {
  prop = prop.replace(propPattern, function (matches, prefix, propName) {
    return propName;
  });

  return properties.indexOf(prop) !== -1;
}

function validate (result, whitelist, blacklist) {
  return function (decl) {
    if (whitelist && whitelist.indexOf(decl.prop) !== -1) {
      return;
    }

    if (blacklist && blacklist.indexOf(decl.prop) !== -1) {
      return reject(result, decl, 'blacklisted');
    }

    if (!validateProp(decl.prop)) {
      return reject(result, decl, 'unknown');
    }
  }
}

module.exports = function(whitelist, blacklist) {
  return function(root, result) {
    root.walkDecls(validate(result, whitelist, blacklist));
  };
};
