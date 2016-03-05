
angular
  .module('classroom')
  .service('RememberSetting', function($state, $cookies) {
    return function(scope, key) {
      const cookieName = $state.current.name + "-" + key;
      
      scope[key] = _.get($cookies.getObject(cookieName), 'value'); 
      scope.$watch(key, function(newValue, oldValue) {
        newValue ? $cookies.putObject(cookieName, {value: newValue}) : $cookies.remove(cookieName);
      });
    };
  });