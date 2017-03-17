angular
  .module('classroom')
  .directive('emojis', function (EMOJIS) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/emojis.html',
      scope: {
        emojiClick: '='
      },
      controller: ($scope) => {

        const _EMOJIS = [...EMOJIS];

        $scope.groups = _.map(_EMOJIS, (em) => ({
          category: em.category,
          icon: em.icon,
          isSelected: false
        }));

        $scope.emojis = (group) => {
          const emojisGroup = _.find(_EMOJIS, {category: group.category});
          return _.difference(emojisGroup.emojis, emojisGroup.notSupported);
        };

        $scope.selectGroup = (group) => {
          $scope.groups.forEach((g) => g.isSelected = false);
          group.isSelected = true;
        };

        $scope.isActive = (group) => group.isSelected;

        $scope.selectEmoji = (emoji) => {
          $scope.emojiClick(emoji);
        };

        $scope.selectGroup($scope.groups[0]);

      },
      link: (scope, element) => {
        const groups = element.find('ul');
        const dropdown = element.find('.dropdown');
        groups.on('click', () => setTimeout(() => dropdown.addClass('open'), 5));
      }

    }

  });
