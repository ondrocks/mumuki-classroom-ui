angular
  .module('classroom')
  .directive('multipleFiles', function (Languages) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/multiple-files.html',
      scope: {
        tabs: '&'
      },
      controller: ($scope) => {
        $scope.data = $scope.tabs();

        let activeTab;

        const selectFirstTab = () => activeTab = _.chain($scope.data).keys().first().value();
        const extension = (key) => _.chain(key).split('.').last().value();

        $scope.select = (key) => {
          activeTab = key
        }

        $scope.isActive = (key) => {
          return activeTab === key;
        }

        $scope.getAceModeFromExtension = (key) => {
          return "javascript"; // TODO: Fix
          return Languages.getAceModeFromExtension(extension(key));
        }

        selectFirstTab();
      }

    }

  })
