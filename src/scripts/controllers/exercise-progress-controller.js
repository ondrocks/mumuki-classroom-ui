
angular
  .module('classroom')
  .controller('ExerciseProgressController', function ($scope, $state, $sce, $stateParams, $filter, toastr, exercisesProgress, Auth, Api, Breadcrumb) {

    const exerciseToView = _.find(exercisesProgress, (progress) => progress.exercise.id === Number($stateParams.eid));

    $scope.exercisesProgress = exercisesProgress;

    let exerciseProgress = exerciseToView || exercisesProgress[0];

    $scope.selectExercise = (exerciseProgress) => {
      $stateParams.eid = exerciseProgress.exercise.id;
      $state.go($state.current.name, $stateParams, { reload: true });
    }

    Breadcrumb.setStudent(exerciseProgress.student);

    const diffs = exerciseProgress.diffs;

    const course = $stateParams.course;
    const MIN = 0;
    const MAX = diffs.length - 1 ;

    const index = () => _.indexOf(diffs, $scope.selectedDiff);
    const prev = () => Math.max(index() - 1, MIN);
    const next = () => Math.min(index() + 1, MAX);

    $scope.first = () => $scope.selectDiff(_.first(diffs));
    $scope.last = () => $scope.selectDiff(_.last(diffs));

    $scope.prev = () => $scope.selectDiff(diffs[prev()]);
    $scope.next = () => $scope.selectDiff(diffs[next()]);

    $scope.index = () => _.findIndex(diffs, $scope.isSelectedDiff);

    $scope.begin = () => {
      // This ugly logic is for fancy pagination;
      const number = _.floor($scope.index() / $scope.limit) * $scope.limit;
      const diffLengthBiggerThanLimit = diffs.length >= $scope.limit;
      const numberBiggerThandiffLength = number + $scope.limit >= diffs.length;

      return diffLengthBiggerThanLimit && numberBiggerThandiffLength ? (diffs.length - $scope.limit) : number;
    };

    $scope.indexNumber = ($index) => _.padStart($scope.begin() + $index + 1, 2, '0');

    $scope.trust = (html) => $sce.trustAsHtml(html);
    $scope.containsHtml = (string) => /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(string);
    $scope.selectDiff = (diff) => $scope.selectedDiff = diff;
    $scope.isSelectedDiff = (diff) => _.isEqual($scope.selectedDiff, diff);

    $scope.limit = 4;
    $scope.diffs = diffs;
    $scope.progress = exerciseProgress;
    $scope.lastSubmission = _.last(exerciseProgress.submissions);

    $scope.selectDiff(diffs[MAX]);

    $scope.comments = (submission) => submission.comments;
    $scope.time = (comment) => moment(comment.date).fromNow();

    const getComments = () => {
      Api.getComments(exerciseProgress.exercise.id, course)
        .then((data) => {
          const groupedComments = _.groupBy(data.comments, 'submission_id');
          _.each($scope.diffs, (submission, index) => {
            submission.right.comments = groupedComments[submission.right.id];
          });
        });
    };

    $scope.addComment = (submission) => {
      if (submission.comment) {
        const data = { exercise_id: exerciseProgress.exercise.id, submission_id: submission.id, comment: {
            content: submission.comment,
            type: submission.commentType,
            date: new Date(),
            email: Auth.profile().email
            }
        }
        Api.comment(data, course)
          .then(() => getComments())
          .then(() => toastr.success($filter('translate')('do_comment')))

        submission.restartComment();
      }
    }

    getComments();

  });
