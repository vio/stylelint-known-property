var format      = require('util').format;
var stylelint   = require('stylelint');
var _           = require('lodash');
var utils       = require('stylelint/dist/utils');

var properties  = require('known-css-properties').all;
var ruleName    = 'plugin/known-property';

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

function isPropertyValid (prop) {
  return properties.indexOf(prop) > -1;
}

function isPropertyIgnored (prop, ignore) {
  if (_.isArray(ignore)) {
    return ignore.indexOf(prop) > -1;
  }

  if (_.isString(ignore)) {
    return prop === ignore;
  }

  return false;
}

function validate (result, ignore) {
  return function (decl) {
    var prop = decl.prop;

    if (!utils.isStandardSyntaxProperty(prop)) {
      return;
    }

    if (utils.isCustomProperty(prop)) {
      return;
    }

    if (isPropertyIgnored(prop, ignore)) {
      return;
    }

    if (isPropertyValid(prop)) {
      return;
    }

    return reject(result, decl, 'unknown');
  };
}

var plugin = stylelint.createPlugin(ruleName, function (enabled, options) {
  return function(root, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
        actual: enabled,
        possible: _.isBoolean
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

module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
