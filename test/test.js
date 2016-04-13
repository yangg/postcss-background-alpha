var fs      = require('fs');
var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (name, opts) {
  var input  = read('test/fixtures/' + name + '.css');
  var output = read('test/fixtures/' + name + '.out.css');
  expect(postcss(plugin(opts)).process(input).css).to.eql(output);
};
var testString = function (input, output, opts) {
  expect(postcss(plugin(opts)).process(input).css).to.eql(output);
};
var read = function (path) {
  return fs.readFileSync(path, 'utf-8');
};

describe('postcss-background-rgba', function () {

  describe('adds fallback filter', function () {

    it('background', function () {
      test('background');
    });
    it('background-color', function () {
      test('background-color');
    });

    it('doesn\'t add fallback if already present', function () {
      test('duplicate');
    });

  });

});
