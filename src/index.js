var format      = require('util').format;
var stylelint   = require('stylelint');
var _           = require('lodash');
var utils       = require('stylelint/dist/utils');

var properties  = require('./../data');

var ruleName    = 'plugin/known-property';
var browserPrefixPattern = new RegExp('^-(webkit|moz|o|ms)-(.*)');

var messages = utils.ruleMessages(ruleName, {
  unknown: function (prop) {
    return format('Unknown property "%s"', prop);
  }
});

function reject(result, node, type) {
  utils.report({
    message: messages[type](node.prop),
    node: node,
    result: result,
    ruleName: ruleName
  });
}

function propertyExists (prop) {
  return properties.indexOf(prop) > -1;
}

function propertyIgnored (prop, ignore) {
  if (_.isArray(ignore)) {
    return ignore.indexOf(prop) > -1;
  }

  if (_.isString(ignore)) {
    return prop === ignore;
  }

  return false;
}

function hasBrowserPrefix (prop) {
  return !!prop.match(browserPrefixPattern);
}

function removeBrowserPrefix (prop) {
  return prop.replace(browserPrefixPattern, function (matches, prefix, propName) {
    return propName;
  });
}

function validate (result, ignore) {
  return function (decl) {
    var prop = removeBrowserPrefix(decl.prop);

    if (!utils.isStandardSyntaxProperty(prop)) {
      return;
    }

    if (utils.isCustomProperty(prop)) {
      return;
    }

    if (propertyIgnored(prop, ignore)) {
      return;
    }

    if (propertyExists(prop)) {
      return;
    }

    return reject(result, decl, 'unknown');
  };
}

module.exports = stylelint.createPlugin(ruleName, function (enabled, options) {
  return function(root, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
        actual: enabled
      }, {
        actual: options,
        possible: {
          ignore: [_.isString],
        },
        optional: true
    });

    if (!validOptions) {
      return;
    }

    if (!enabled) {
      return;
    }

    if (!options) {
      options = {};
    }

    root.walkDecls(validate(result, options.ignore));
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
