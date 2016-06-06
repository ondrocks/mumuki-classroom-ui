
angular
  .module('classroom')
  .service('RememberSetting', function($state, $cookies) {

    const preferences = {
      showDetails: false,
      onlyFollowers: false,
    };

    const toggleField = (field) => {
      preferences[field] = !preferences[field];
      $cookies.putObject(field, { value: preferences[field] });
    }

    const RememberSetting = (scope, key) => {
      const cookieName = $state.current.name + "-" + key;

      scope[key] = _.get($cookies.getObject(cookieName), 'value');
      scope.$watch(key, (newValue, oldValue) => {
        if (_.isNil(newValue)) {
          $cookies.remove(cookieName)
        } else {
          $cookies.putObject(cookieName, {value: newValue})
        }
      });
    };

    RememberSetting.showDetails = () => preferences.showDetails;
    RememberSetting.onlyFollowers = () => preferences.onlyFollowers;

    RememberSetting.toggleShowDetails = () => toggleField('showDetails');
    RememberSetting.toggleOnlyFollowers = () => toggleField('onlyFollowers');

    return RememberSetting;

  });
