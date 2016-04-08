
angular
  .module('classroom')
  .controller('ExerciseProgressController', function ($scope, $sce, $filter, toastr, exerciseProgress, Auth, Api) {

    const diffs = exerciseProgress.diffs;

    const MIN = 0;
    const MAX = diffs.length - 1 ;

    const index = () => _.indexOf(diffs, $scope.selectedDiff);
    const prev = () => Math.max(index() - 1, MIN);
    const next = () => Math.min(index() + 1, MAX);

    $scope.diffs = diffs;
    $scope.progress = exerciseProgress;
    $scope.lastSubmission = _.last(exerciseProgress.submissions);

    $scope.prev = () => $scope.selectDiff(diffs[prev()]);
    $scope.next = () => $scope.selectDiff(diffs[next()]);
    $scope.trust = (html) => $sce.trustAsHtml(html);
    $scope.selectDiff = (diff) => $scope.selectedDiff = diff;
    $scope.isSelectedDiff = (diff) => _.isEqual($scope.selectedDiff, diff);

    $scope.selectDiff(diffs[MIN]);

    $scope.comments = (submission) => submission.comments;
    $scope.time = (comment) => moment(comment.date).fromNow();
    const getComments = () => {
      Api.getComments(exerciseProgress.exercise.id)
          .then((data) => {
            const groupedComments = _.groupBy(data.comments, 'submission_id');
            _.each($scope.diffs, (submission, index) => {
              submission.right.comments = groupedComments[submission.right.id];
            });
          });
    };
    getComments();
    $scope.addComment = (submission) => {
      if (submission.comment) {
        const data = { exercise_id: exerciseProgress.exercise.id, submission_id: submission.id, comment: {
            content: submission.comment,
            type: submission.commentType,
            date: new Date(),
            email: Auth.profile().email
            }
        }
        Api.comment(data)
          .then(() => getComments())
          .then(() => toastr.success($filter('translate')('do_comment')))
        submission.restartComment();
      }
    }

  });
