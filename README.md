# stylelint-known-property

[Stylelint](http://stylelint.io) plugin to check if the css properties are valid (CSS2 & CSS3).

## Options

### `ignore: string | array`

Provide a property or a list of properties that will not be checked.

## Install

```
npm install -D stylelint-known-property
```

## Usage

Add the plugin to your [Stylelint config](http://stylelint.io/user-guide/configuration/):

```
{
  "plugins": [
    "stylelint-known-property"
  ],

  "rules": {
    "plugin/known-property": true
  }
}
```

With ignored properties:
```
{
  "plugins": [
    "stylelint-known-property"
  ],

  "rules": {
    "plugin/known-property": [true, {
      ignore: ['fill']
    }
  }
}
```

## CSS Properties

CSS properties are validated based on
[known-css-properties](https://github.com/betit/known-css-properties) list. 
