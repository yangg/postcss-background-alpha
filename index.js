var postcss = require('postcss');

module.exports = postcss.plugin('postcss-bacground-rgba', function (opts) {
  opts = opts || {};

  var PROP         = /^background(-color)?/;
  var PROP_REPLACE = '-ms-filter';

  function color2Hex(color) {
    var hex = Math.round(color).toString(16);
    return hex.length > 1 ? hex : '0' + hex;
  }

  return function (css) {

    css.walkRules(function (rule) {

      // find if a filter opacity is already present
      var isFilterAlreadyPresent = false;
      rule.walkDecls(PROP_REPLACE, function () {
        isFilterAlreadyPresent = true;
      });

      // adds new property only if it's not present yet
      if (!isFilterAlreadyPresent) {
        rule.walkDecls(PROP, function (decl) {
          var colors = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(decl.value);

          if(colors) {
            // https://en.wikipedia.org/wiki/RGBA_color_space
            var alpha = color2Hex(colors[4] * 255);
            var colorR = color2Hex(colors[1]);
            var colorG = color2Hex(colors[2]);
            var colorB = color2Hex(colors[3]);
            var gradientColor = '#' + alpha + colorR + colorG + colorB;
            var VAL_REPLACE  = "\"progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='" + gradientColor + "',EndColorStr = '" + gradientColor + "')\"";
            rule.insertAfter(decl, {prop: PROP_REPLACE, value: VAL_REPLACE});
          }
        });
      }
    });

  };
});
