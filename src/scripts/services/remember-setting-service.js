
angular
  .module('classroom')
  .service('RememberSetting', function($state, $cookies) {
    return (scope, key) => {
      const cookieName = $state.current.name + "-" + key;
      
      scope[key] = _.get($cookies.getObject(cookieName), 'value'); 
      scope.$watch(key, (newValue, oldValue) => {
        if (_.isEmpty(newValue)) { 
          $cookies.remove(cookieName)
        } else {
          $cookies.putObject(cookieName, {value: newValue})
        }
      });
    };
  });