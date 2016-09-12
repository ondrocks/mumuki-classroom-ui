
angular
  .module('classroom')
  .controller('ExerciseProgressController', function ($scope, $state, $sce, $stateParams, $filter, toastr, exercisesProgress, containsHtml, Auth, Api, Breadcrumb, Preferences, Humanizer, Domain) {

    Preferences($scope, 'options');

    const exerciseToView = _.find(exercisesProgress, (progress) => progress.exercise.id === Number($stateParams.eid));

    $scope.exercisesProgress = exercisesProgress;

    $scope.atheneumLink = () => _.isEmpty(exerciseProgress.exercise.bilbiotheca_id)
                                  ? Domain.exerciseURL(exerciseProgress.exercise.id)
                                  : Domain.exerciseURLByBibliotheca(exerciseProgress.guide.slug, exerciseProgress.exercise.bibliotheca_id)

    let exerciseProgress = exerciseToView || exercisesProgress[0];

    $scope.selectExercise = (exerciseProgress) => {
      $stateParams.eid = exerciseProgress.exercise.id;
      $state.go($state.current.name, $stateParams, { reload: true });
    }

    const course = $stateParams.course;
    Breadcrumb.setCourse(course);
    Breadcrumb.setGuide(exerciseProgress.guide);
    Breadcrumb.setStudent(exerciseProgress.student);

    const diffs = exerciseProgress.diffs;

    const SPLIT = { type: 'side-by-side', name: 'split' };
    const UNIFIED = { type: 'line-by-line', name: 'unified' };
    const LAST_SOLUTION = { type: 'only-last', name: 'last_solution' };
    if (_.isEmpty($scope.options)) $scope.options = { viewMode: UNIFIED };

    const MIN = 0;
    const MAX = diffs.length - 1 ;

    const index = () => _.indexOf(diffs, $scope.selectedDiff);
    const prev = () => Math.max(index() - 1, MIN);
    const next = () => Math.min(index() + 1, MAX);

    $scope.lastDiff = () => _.last(diffs);

    $scope.first = () => $scope.selectDiff(_.first(diffs));
    $scope.last = () => $scope.selectDiff($scope.lastDiff());

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
    $scope.containsHtml = containsHtml;
    $scope.selectDiff = (diff) => $scope.selectedDiff = diff;
    $scope.isSelectedDiff = (diff) => _.isEqual($scope.selectedDiff, diff);

    $scope.limit = 4;
    $scope.diffs = diffs;
    $scope.progress = exerciseProgress;
    $scope.lastSubmission = _.last(exerciseProgress.submissions);
    $scope.lastSubmissionDate = Humanizer.date($scope.lastSubmission.created_at);
    $scope.submissionsCount = exerciseProgress.submissions.length;
    $scope.progressSelected = (progress) => progress.exercise.id === $scope.progress.exercise.id

    $scope.selectDiff(diffs[MAX]);

    $scope.comments = (submission) => submission.comments;
    $scope.time = (comment) => moment(comment.date).fromNow();

    $scope.isLastSolutionActivated = () => _.isEqual($scope.options.viewMode, LAST_SOLUTION);
    $scope.getViewMode = () => $scope.options.viewMode;

    $scope.split = () => $scope.options.viewMode = SPLIT;
    $scope.unified = () => $scope.options.viewMode = UNIFIED;
    $scope.lastSolution = () => {
      $scope.selectDiff($scope.lastDiff());
      $scope.options.viewMode = LAST_SOLUTION;
    };

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
