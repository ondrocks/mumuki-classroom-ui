angular
  .module('classroom')
  .directive('includeReplace', function () {
    return {
      require: 'ngInclude',
      restrict: 'A',
      link: function (scope, el) {
        el.replaceWith(el.children());
      }
    };
});
