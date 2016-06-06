
angular
  .module('classroom')
  .service('Preferences', function($state, $cookies) {

    const preferences = {
      showDetails: false,
      onlyFollowers: false,
    };

    const toggleField = (field) => {
      preferences[field] = !preferences[field];
      $cookies.putObject(field, { value: preferences[field] });
    }

    const Preferences = (scope, key) => {
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

    Preferences.showDetails = () => preferences.showDetails;
    Preferences.onlyFollowers = () => preferences.onlyFollowers;

    Preferences.toggleShowDetails = () => toggleField('showDetails');
    Preferences.toggleOnlyFollowers = () => toggleField('onlyFollowers');

    return Preferences;

  });
