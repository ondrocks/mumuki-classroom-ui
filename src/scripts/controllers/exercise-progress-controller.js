
angular
  .module('classroom')
  .controller('ExerciseProgressController', function ($scope, $sce, $stateParams, $filter, toastr, exercisesProgress, Auth, Api) {

    $scope.exercisesProgress = exercisesProgress;

    $scope.selectExercise = (exercise) => {
      let exerciseProgress = exercise;
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
        return _.floor($scope.index() / $scope.limit) * $scope.limit;
      };

      $scope.indexNumber = ($index) => _.padStart($scope.begin() + $index + 1, 2, '0');

      $scope.trust = (html) => $sce.trustAsHtml(html);
      $scope.selectDiff = (diff) => $scope.selectedDiff = diff;
      $scope.isSelectedDiff = (diff) => _.isEqual($scope.selectedDiff, diff);

      $scope.limit = 5;
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

    }

    $scope.selectExercise(exercisesProgress[0]);

  });
