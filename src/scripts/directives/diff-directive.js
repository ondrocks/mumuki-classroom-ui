
angular
  .module('classroom')
  .directive('diffSide', function ($filter) {
    return {
      restrict: 'E',
      scope: {
        language: '@',
        left: '=',
        right: '=',
        viewMode: '='
      },
      templateUrl: 'views/diff.html',
      controller: ($scope, Humanizer) => {
        $scope.$watchGroup(['left', 'right', 'viewMode'], () => {

          const lines = JsDiff.diffLines($scope.left.content, $scope.right.content);

          const prefix = (line, pre) => {
            let subLines = line.value.split('\n');
            if (_.isEmpty(_.last(subLines))) subLines.pop();
            return _.map(subLines, (l) => `${pre}  ${l}`).join('\n');
          };

          const diffLines = _.map(lines, (line) => {
            return (line.added)  ? prefix(line, '+') :
                  (line.removed) ? prefix(line, '-') : prefix(line, '  ');
          });

          const date = Humanizer.date($scope.right.created_at);

          const diffText = [
            `diff --git`,
            `index fc56817..e8e7e49 100644`,
            `--- a/${date}`,
            `+++ b/${date}`,
            `@@ -1,1 +1,1 @@`,
            ...diffLines
          ].join('\n');

          const diffJson = Diff2Html.getJsonFromDiff(diffText);

          angular.element('#diff').html(Diff2Html.getPrettyHtml(diffJson, {
            inputFormat: 'json',
            outputFormat: $scope.viewMode,
            showFiles: false,
            matching: 'lines'
          }));

        });
      }
    };
  });
