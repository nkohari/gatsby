"use strict";

var _require = require("../gatsby-node"),
    resolvableExtensions = _require.resolvableExtensions,
    modifyWebpackConfig = _require.modifyWebpackConfig,
    preprocessSource = _require.preprocessSource;

describe("gatsby-plugin-coffeescript", function () {
  it("contains coffee script extensions", function () {
    expect(resolvableExtensions()).toMatchSnapshot();
  });

  it("modifies webpack config with cofeescript extensions", function () {
    var spy = jest.fn();
    var config = {
      loader: function loader() {
        spy.apply(undefined, arguments);
      }
    };

    modifyWebpackConfig({ config: config });

    expect(spy).toHaveBeenCalledTimes(resolvableExtensions().length);
  });

  describe("pre processing", function () {
    it("returns null if non-coffeescript file", function () {
      expect(preprocessSource({
        filename: "test.js",
        contents: "alert('hello');"
      })).toBe(null);
    });

    it("transforms .coffee files", function () {
      expect(preprocessSource({
        filename: "test.coffee",
        contents: "alert \"I knew it!\" if elvis?"
      }, {})).toMatchSnapshot();
    });

    it("transforms .cjsx files", function () {
      expect(preprocessSource({
        filename: "test.cjsx",
        contents: "\n          React = require('react');\n\n          module.exports = class extends React.Component {\n            render: ->\n              <div>\n                <h1>Hello World</h1>\n              </div>\n          }\n        "
      }, {})).toMatchSnapshot();
    });
  });
});