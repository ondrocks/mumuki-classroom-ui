
angular
  .module('classroom')
  .service('RememberSetting', function($state, $cookies) {
    return function(scope, key) {
      const cookieName = $state.current.name + "-" + key;
      
      scope[key] = $cookies.get(cookieName), scope.$watch(key, function(newValue, oldValue) {
        newValue ? $cookies.put(cookieName, newValue) : $cookies.remove(cookieName);
      });
    };
  });