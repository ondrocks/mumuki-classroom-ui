
angular
  .module('classroom')
  .controller('ExerciseProgressController', function ($scope, $sce, exerciseProgress, Auth, Api) {

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
    _.map(diffs, (sub) => {
      console.log('aaaa');
        return Api.getComments(sub.id)
            .then((comments) => sub.comments = comments);
    });

    $scope.addComment = (submission) => {
      if (submission.comment) {
        let data = { submission_id: submission.id, comment: {
            content: submission.comment,
            type: submission.commentType,
            date: Date.now(),
            email: Auth.profile().email
            }
        }
        Api.comment(data)
        submission.addComment(data);
        submission.restartComment();
      }
    }

  });
