angular
  .module('classroom')
  .factory('WithMultifileSupport', function() {
    _.mixin({
      match: (string, regexp) => string.match(regexp),
      flipTransform: (object, value, func) => _.transform(object, func, value)
    });

    return {
      hasFiles() {
        return !_.isEmpty(this.files());
      },

      files() {
        const content = this.content;
        const start = _.escapeRegExp("/*");
        const end = _.escapeRegExp("*/");

        const regexpString = `${start}<(.+?)#${end}((\\\s|\\\S)*?)${start}#(.+?)>${end}`;
        return _(content)
          .match(new RegExp(regexpString, 'gm'))
          .flipTransform({}, (res, capture) => this._fromFile(res, capture, new RegExp(regexpString)))
          .value();
      },

      _fromFile(result, capture, regexp) {
        const [_, key, value, __, confirmKey] = capture.match(regexp);
        if (key === confirmKey) result[key] = value;
      }
    };
  });

