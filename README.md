# stylelint-known-property

[Stylelint](http://stylelint.io) plugin to check if the css properties are valid.

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
    "known-property": [["whitelisted-property"], ["blacklisted-property"]]
  }
}
```
