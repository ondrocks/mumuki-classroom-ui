angular
  .module('classroom')
  .directive('customEditor', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/custom-editor.html',
      scope: {
        language: '=',
        content: '='
      },
      controller: ($scope) => {
    },
      compile: (element) => {
        return function (scope, element) {
          const editor_tag = `mu-${scope.language}-custom-editor`;
          element.prepend(`<${editor_tag}> </${editor_tag}>`);
        };
      }
    }
  })
