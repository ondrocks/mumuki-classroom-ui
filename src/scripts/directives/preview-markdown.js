angular
  .module('classroom')
  .directive('markdownPreview', function ($sce,
                                          $filter,
                                          Api) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/markdown-preview.html',
      scope: {
        header: '@',
        content: '='
      },
      controller: ($scope) => {

        let _html;

        $scope.html = () => {
          return $sce.trustAsHtml(_html);
        };

        $scope.content = $scope.content || '';

        const renderMarkdown = () => {
          return Api.renderMarkdown($scope.content).then((markdown) => _html = markdown);
        };

        $scope.$watch('content', () => {
            renderMarkdown().then(() => $scope.$apply());
        });

      }

    }

  })
