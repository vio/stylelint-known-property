var stylelint   = require('stylelint');
var _           = require('lodash');

var report      = stylelint.utils.report;
var properties  = require('./../data');
var messages    = require('./messages');

var ruleName    = 'plugin/known-property';
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

module.exports = stylelint.createPlugin(ruleName, function (whitelist, blacklist) {
  return function(root, result) {
    var validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: whitelist,
        possible: [_.isString],
        optional: true
      }, {
        actual: blacklist,
        possible: [_.isString],
        optional: true
      });

    if (!validOptions) {
      return;
    }

    root.walkDecls(validate(result, whitelist, blacklist));
  };
});

module.exports.ruleName = ruleName;
