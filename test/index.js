var ruleTester    = require('stylelint-rule-tester');
var knownProperty = require('./../');
var messages      = knownProperty.messages
var test          = ruleTester(knownProperty.rule, knownProperty.ruleName);

test(true, {ignore: ['ignored-property']}, function (assert) {
    assert.ok('div { color: green; }');
    assert.notOk('div { colr: blue; }', messages.unknown('colr'));

    // non standard propery
    assert.ok('div { $height: 100px; }');
    assert.ok('div { @height: 100px; }');

    // custom property
    assert.ok(':root { --height: 100px; }');

    // vendors
    assert.ok('a { -webkit-transform: none }');
    assert.ok('a { -moz-transform: none }');
    assert.ok('a { -o-transform: none }');
    assert.ok('a { -ms-transform: none }');
    assert.notOk('a { -x-transform: none }', messages.unknown('-x-transform'));

    // ignored property
    assert.ok('a { ignored-property: none }');
});
