angular
  .module('classroom')
  .controller('NewMessageController', function ($scope, $sce, $stateParams, $uibModalInstance, student, message, course, callback, Api, Humanizer) {

    $scope.student = student;
    $scope.message = message;
    $scope.Humanizer = Humanizer;

    const loadSuggestions = () => {
      return Api
        .getSuggestions(message)
        .then((res) => {
          $scope.suggestions = res.data;
        });
    }

    $scope.isSelected = (suggestion) => $scope.message.suggestion_id === suggestion.id;

    $scope.useSuggestion = (suggestion) => {
      $scope.message.suggestion_id = suggestion.id;
      $scope.message.message.content = suggestion.content;
    }

    $scope.send = () => {
      return Api
        .newMessage($scope.message, course)
        .then((res) => {
          $scope.cancel();
          return callback(res.data.message || $scope.message.message);
        });
    }

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

    $scope.toggle = () => {
      angular.element('.modal-body, .modal-footer')[$scope.expanded ? 'show' : 'hide']();
      $scope.expanded = !$scope.expanded;
    }

    loadSuggestions();
  });
