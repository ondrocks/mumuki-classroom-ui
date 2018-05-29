angular
  .module('classroom')
  .directive('customEditor', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/custom-editor.html',
      scope: {
        language: '=',
        content: '=',
        extraAttributes: '='
      },
      controller: ($scope) => {
      },
      compile: (element) => {
        return function (scope, element) {
          const editorTag = `mu-${scope.language}-custom-editor`;
          element.prepend(`<${editorTag} ${scope.extraAttributes || ""} > </${editorTag}>`);
        };
      }
    }
  })
