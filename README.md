# PostCSS background-alpha [![Build Status](https://travis-ci.org/yangg/postcss-background-alpha.svg)](https://travis-ci.org/yangg/postcss-background-alpha)

[PostCSS] PostCSS plugin to add gradient filter for IE8 to support rgba background.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */
.foo {
  background-color: rgba(0,0,0,0.5);
}
```

```css
/* Output example */
.foo {
  background-color: rgba(0,0,0,0.5);
  -ms-filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='80000000',EndColorStr = '80000000');
}
```

## Usage

```js
postcss([ require('postcss-background-alpha') ])
```

See [PostCSS] docs for examples for your environment.
