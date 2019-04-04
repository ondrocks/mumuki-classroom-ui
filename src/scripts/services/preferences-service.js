
angular
  .module('classroom')
  .service('Preferences', function($state, $cookies) {

    const preferences = {
      showDetails: null,
      onlyFollowers: null,
      showDetachedStudents: null
    };

    const toggleField = (field) => {
      preferences[field] = !preferences[field];
      $cookies.putObject(field, { value: preferences[field] });
    };

    const getField = (field) => {
      if (_.isNull(preferences[field])) {
        preferences[field] = _.get($cookies.getObject(field), 'value');
      }
      return preferences[field];
    };

    const Preferences = (scope, key) => {
      const cookieName = $state.current.name + "-" + key;

      scope[key] = _.get($cookies.getObject(cookieName), 'value');
      scope.$watch(key, (newValue, oldValue) => {
        if (_.isNil(newValue)) {
          $cookies.remove(cookieName)
        } else {
          $cookies.putObject(cookieName, {value: newValue})
        }
      }, true);
    };

    Preferences.showDetails = () => getField('showDetails');
    Preferences.onlyFollowers = () => getField('onlyFollowers');
    Preferences.showDetachedStudents = () => getField('showDetachedStudents');

    Preferences.toggleShowDetails = () => toggleField('showDetails');
    Preferences.toggleOnlyFollowers = () => toggleField('onlyFollowers');
    Preferences.toggleShowDetachedStudents = () => toggleField('showDetachedStudents');

    return Preferences;

  });
