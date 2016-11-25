
angular
  .module('classroom')
  .controller('ExerciseProgressController', function ($scope, $state, $sce, $stateParams, $filter, toastr, hotkeys, exercisesProgress, containsHtml, Auth, Api, Breadcrumb, Preferences, Humanizer, Domain) {

    Preferences($scope, 'options');

    const SPLIT = { type: 'side-by-side', name: 'split' };
    const UNIFIED = { type: 'line-by-line', name: 'unified' };
    const LAST_SOLUTION = { type: 'only-last', name: 'last_solution' };

    const exerciseToView = _.find(exercisesProgress, (progress) => progress.exercise.id === Number($stateParams.eid));

    $scope.exercisesProgress = $filter('orderBy')(exercisesProgress, ['exercise.number', 'exercise.name']);

    $scope.atheneumLink = () => _.isEmpty(exerciseProgress.exercise.bilbiotheca_id)
                                  ? Domain.exerciseURL(exerciseProgress.exercise.id)
                                  : Domain.exerciseURLByBibliotheca(exerciseProgress.guide.slug, exerciseProgress.exercise.bibliotheca_id)

    let exerciseProgress = exerciseToView || exercisesProgress[0];

    const course = $stateParams.course;
    Breadcrumb.setCourse(course);
    Breadcrumb.setGuide(exerciseProgress.guide);
    Breadcrumb.setStudent(exerciseProgress.student);

    hotkeys
      .bindTo($scope)
      .add({
        combo: ['ctrl+up', 'ctrl+left', 'command+up', 'command+left', 'k'],
        description: $filter('translate')('next_exercise_description'),
        callback: () => $scope.selectExercise($scope.prevExercise()),
      })
      .add({
        combo: ['ctrl+down', 'ctrl+right', 'command+down', 'command+right', 'j'],
        description: $filter('translate')('prev_exercise_description'),
        callback: () => $scope.selectExercise($scope.nextExercise()),
      })
      .add({
        combo: ['left'],
        description: $filter('translate')('next_solution_description'),
        callback: () => {
          if (!_.isEqual($scope.options.viewMode, LAST_SOLUTION)) {
            $scope.prev();
          }
        }
      })
      .add({
        combo: ['right'],
        description: $filter('translate')('prev_solution_description'),
        callback: () => {
          if (!_.isEqual($scope.options.viewMode, LAST_SOLUTION)) {
            $scope.next();
          }
        },
      });

    const currentExerciseProgressIndex = () => {
      return _.findIndex($scope.exercisesProgress, (p) => p.exercise.id === Number($stateParams.eid));
    }

    $scope.nextExercise = () => {
      const exercisesProgressIndex = currentExerciseProgressIndex();
      return $scope.exercisesProgress[Math.min(exercisesProgressIndex + 1, exercisesProgress.length - 1)];
    }

    $scope.prevExercise = () => {
      const exercisesProgressIndex = currentExerciseProgressIndex();
      return $scope.exercisesProgress[Math.max(exercisesProgressIndex - 1, 0)]
    }

    $scope.selectExercise = (exerciseProgress) => {
      $stateParams.eid = exerciseProgress.exercise.id;
      const diffs = exerciseProgress.diffs;

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

      $scope.time = (comment) => moment(comment.date).fromNow();

      $scope.isLastSolutionActivated = () => _.isEqual($scope.options.viewMode, LAST_SOLUTION);
      $scope.getViewMode = () => $scope.options.viewMode;

      $scope.split = () => $scope.options.viewMode = SPLIT;
      $scope.unified = () => $scope.options.viewMode = UNIFIED;
      $scope.lastSolution = () => {
        $scope.selectDiff($scope.lastDiff());
        $scope.options.viewMode = LAST_SOLUTION;
      };

      $scope.submissionHasComments = (submission) => {
        return !_.isEmpty(submission.comments);
      }
      $scope.hasComments = (progress) => {
        return _.some(progress.submissions, (submission) => $scope.submissionHasComments(submission));
      }
      $scope.showCommentsIcon = (progress) => {
        return $scope.submissionHasComments(progress.lastSubmission());
      };
      $scope.showNewCommentsIcon = (progress) => {
        return !$scope.showCommentsIcon(progress) && $scope.hasComments(progress);
      };

      const getCommentToPost = (submission) => {
        return {
          social_id: $stateParams.student,
          exercise_id: exerciseProgress.exercise.id,
          submission_id: submission.id,
          comment: {
            content: submission.comment,
            type: submission.commentType,
            date: new Date(),
            email: Auth.profile().email
          }
        }
      }

      $scope.addComment = (submission) => {
        if (submission.comment) {
          const data = getCommentToPost(submission);
          submission.comments.push(data.comment);
          Api
            .comment(data, course)
            .then(() => submission.restartComment())
            .then(() => toastr.success($filter('translate')('do_comment')))
        }
      }

    }

    $scope.selectExercise(exerciseToView);

  });
