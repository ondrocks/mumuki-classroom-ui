angular
  .module('classroom')
  .controller('CsvController', function ($scope) {

    $scope.setAsPristine = () => {
      $scope.csv = {
        content: null,
        header: true,
        headerVisible: true,
        separator: ',',
        result: null,
        uploadButtonLabel: "Seleccionar"
      };
    };
    
  });
