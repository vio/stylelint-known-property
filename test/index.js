var util = require('util');

var ruleTester = require('stylelint-rule-tester');
var test       = ruleTester(require('./..'), 'known-property');

function message (prop) {
  return util.format('Unknown property \'%s\'', prop);
}

test('always', function (assert) {
    assert.ok('div { color: green; }');
    assert.notOk('div { colr: blue; }', message('colr'));
    assert.ok('a { -webkit-transform: none }');
    assert.ok('a { -moz-transform: none }');
    assert.ok('a { -o-transform: none }');
    assert.ok('a { -ms-transform: none }');
    assert.notOk('a { -x-transform: none }', message('-x-transform'));
});