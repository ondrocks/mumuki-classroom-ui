angular
  .module('classroom')
  .directive('aceWithMarkdown', function ($sce,
                                          $filter,
                                          AceEditor,
                                          Api) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-with-markdown.html',
      scope: {
        header: '@',
        content: '='
      },
      controller: ($scope) => {

        const translate = $filter('translate');

        const WRITE = 'write';
        const PREVIEW = 'preview';

        let _selectedTab = WRITE;
        let _html;

        const renderMarkdown = () => {
          return Api.renderMarkdown($scope.content).then((markdown) => _html = markdown);
        };

        const active = (tab) => {
          _selectedTab = tab;
        };

        const update = () => {
          AceEditor.update($scope.editor, $scope.placeholder);
        }

        $scope.html = () => {
          return $sce.trustAsHtml(_html);
        }

        $scope.write = () => active(WRITE);
        $scope.preview = () => active(PREVIEW);

        $scope.activeWriteClass = () => ({ active: _selectedTab === WRITE });
        $scope.activePreviewClass = () => ({ active: _selectedTab === PREVIEW });

        $scope.content = $scope.content || '';
        $scope.placeholder = translate(`${$scope.header}`);

        $scope.aceEditor = AceEditor.defaults({
          mode: 'markdown',
          showGutter: false,
          rendererOptions: { minLines: 10 },
          onChange: () => update(),
          onLoad: (editor) => {
            $scope.editor = editor;
            AceEditor.onLoadDefault(editor);
            update();
            editor.setHighlightGutterLine(false);
          }
        });

        $scope.$watch(() => _selectedTab, (newVal) => {
          if (newVal === PREVIEW) {
           renderMarkdown();
          }
        });

      }

    }

  })
