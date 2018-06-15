angular
  .module('classroom')
  .run(($rootScope) => {
    // https://github.com/angular/angular.js/blob/v1.4.x/src/ng/filter/filter.js#L174

    const hasCustomToString = (obj) => {
      return angular.isFunction(obj.toString) && obj.toString !== Object.prototype.toString;
    };

    $rootScope.searchComparator = (actual, expected) => {
      if (angular.isUndefined(actual)) {
        // No substring matching against `undefined`
        return false;
      }
      if ((actual === null) || (expected === null)) {
        // No substring matching against `null`; only match against `null`
        return actual === expected;
      }
      if (angular.isObject(expected) || (angular.isObject(actual) && !hasCustomToString(actual))) {
        // Should not compare primitives against objects, unless they have custom `toString` method
        return false;
      }

      actual = _.deburr(angular.lowercase('' + actual));
      expected = _.deburr(angular.lowercase('' + expected));

      return actual.indexOf(expected) !== -1;
    };
  });
