var stylelint   = require('stylelint');
var report      = stylelint.utils.report;

var properties  = require('./../data');
var messages    = require('./messages');

var ruleName    = 'known-property';
var browserPrefixPattern = new RegExp('^-(webkit|moz|o|ms)-(.*)');

function reject(result, node, type) {
  report({
    message: messages(type, node.prop),
    node: node,
    result: result,
    ruleName: ruleName
  });
}

function propertyExists (prop) {
  return properties.indexOf(prop) > -1;
}

function hasBrowserPrefix (prop) {
  return !!prop.match(browserPrefixPattern);
}

function removeBrowserPrefix (prop) {
  return prop.replace(browserPrefixPattern, function (matches, prefix, propName) {
    return propName;
  });
}

function validate (result, whitelist, blacklist) {
  return function (decl) {
    var prop = decl.prop;

    if (whitelist && whitelist.indexOf(prop) !== -1) {
      return;
    }

    if (blacklist && blacklist.indexOf(prop) !== -1) {
      return reject(result, decl, 'blacklisted');
    }

    if (propertyExists(prop)) {
      return;
    }

    if (hasBrowserPrefix(prop) && propertyExists(removeBrowserPrefix(prop))) {
      return;
    }
        
    return reject(result, decl, 'unknown');
  };
}

module.exports = function(whitelist, blacklist) {
  return function(root, result) {
    root.walkDecls(validate(result, whitelist, blacklist));
  };
};
