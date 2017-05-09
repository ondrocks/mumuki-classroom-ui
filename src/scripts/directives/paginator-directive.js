angular
  .module('classroom')
  .directive('paginator', function ($state, $stateParams) {

    return {

      restrict: 'E',
      template: `
        <ul class='pagination'>
          <li>
            <a href='' ng-click='goToPage(1)'>
              <span aria-hidden='true'> « </span>
            </a>
          </li>

          <li>
            <a href='' ng-click='goToPage(prevPage())'>
              <span aria-hidden='true'> &lt; </span>
            </a>
          </li>

          <li ng-repeat='page in pages() | limitTo:limit():begin()' ng-class='{ "active": pgActualPage === page }'>
            <a href='' ng-click='goToPage(page)'>
              <span> {{ pad(page) }} </span>
            </a>
          </li>

          <li>
            <a href='' ng-click='goToPage(nextPage())'>
              <span aria-hidden='true'> &gt; </span>
            </a>
          </li>

          <li>
            <a href='' ng-click='goToPage(totalPages())'>
              <span aria-hidden='true'> » </span>
            </a>
          </li>
        </ul>
      `,
      scope: {
        pgItemsPerPage: '@',
        pgTotalItems: '=',
        pgActualPage: '=',
        pgOffset: '=',
        pgState: '@'
      },
      controller: ($scope) => {

        const pageOffset = $scope.pgOffset;

        $scope.limit = () => pageOffset * 2 + 1;

        $scope.totalPages = () => _.ceil($scope.pgTotalItems / $scope.pgItemsPerPage);

        $scope.actualPage = () => $scope.pgActualPage;
        $scope.begin = () => {
          const total = $scope.totalPages();
          const actual = $scope.actualPage();
          if (actual <= pageOffset + 1) {
            return 0;
          } else if (total - actual <= pageOffset) {
            return total - $scope.limit();
          } else {
            return actual - pageOffset - 1;
          }
        }

        $scope.pad = (page) => _.padStart(page.toString(), $scope.totalPages().toString().length, '0');

        $scope.pages = () => _.range(1, $scope.totalPages() + 1);

        $scope.prevPage = () => Math.max($scope.actualPage() - 1, 1);
        $scope.nextPage = () => Math.min($scope.actualPage() + 1, $scope.totalPages());

        $scope.goToPage = (page) => $state.go($scope.pgState, { page });

      }

    }

  })
