angular
  .module('classroom')
  .directive('multipleFiles', function (Languages, Api) {
    const makePromiseFromObject = (obj) => {
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      return Promise.all(values).then(resolved => {
        const res = {};
        for (let i = 0; i < keys.length; i += 1) res[keys[i]] = resolved[i];
        return res;
      });
    };

    return {
      restrict: 'E',
      templateUrl: 'views/directives/multiple-files.html',
      scope: {
        tabs: '&'
      },
      controller: ($scope) => {
        let activeTab;
        const selectFirstTab = () => activeTab = _.chain($scope.data).keys().first().value();
        const extension = (key) => _.chain(key).split('.').last().value();
        $scope.select = (key) => { activeTab = key }
        $scope.isActive = (key) => activeTab === key;

        const $files = _.mapValues($scope.tabs(), (v, k) => {
          return Api.renderCode(extension(k), v);
        });

        makePromiseFromObject($files).then((files) => {
          $scope.data = files;
          selectFirstTab();
        });
      }
    }

  })
