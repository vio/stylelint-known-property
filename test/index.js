var messages   = require('./../src/messages');
var ruleTester = require('stylelint-rule-tester');
var test       = ruleTester(require('./..'), 'known-property');

var props = {
  whitelisted: ['whitelisted-property'],
  blacklisted: ['blacklisted-property']
};

test(props.whitelisted, props.blacklisted, function (assert) {
    assert.ok('div { color: green; }');
    assert.notOk('div { colr: blue; }', messages('unknown', 'colr'));

    // vendors
    assert.ok('a { -webkit-transform: none }');
    assert.ok('a { -moz-transform: none }');
    assert.ok('a { -o-transform: none }');
    assert.ok('a { -ms-transform: none }');
    assert.notOk('a { -x-transform: none }', messages('unknown', '-x-transform'));

    // whitelisted & blacklisted
    assert.ok('a { whitelisted-property: none }');
    assert.notOk('a { blacklisted-property: none }', messages('blacklisted', 'blacklisted-property'));
});
