
angular
  .module('classroom')
  .controller('ExerciseProgressController', function ($scope, $state, $sce, $stateParams, $filter, toastr, hotkeys, guide, exercisesProgress, containsHtml, ExerciseProgress, Auth, Api, Breadcrumb, Preferences, Humanizer, Domain) {

    Preferences($scope, 'options');

    let currentExerciseId;

    const SPLIT = { type: 'side-by-side', name: 'split' };
    const UNIFIED = { type: 'line-by-line', name: 'unified' };
    const LAST_SOLUTION = { type: 'only-last', name: 'last_solution' };

    const exerciseToView = _.find(exercisesProgress, (progress) => progress.exercise.eid === Number($stateParams.eid));

    const toExerciseProgress = (e, i) => {
      const currentExercise = _.find(exercisesProgress, (progress) => progress.exercise.eid === e.id);
      e = _.merge(e, {
        eid: (_.get(currentExercise, 'exercise.eid') === e.id ? currentExercise.exercise.eid : e.id),
        number: i + 1
      });
      const exerciseProgress = _.find(exercisesProgress, (p) => e.eid === p.exercise.eid);
      return ExerciseProgress.from({
        guide: _.omit(guide, 'exercises'),
        student: _.get(exercisesProgress[0], 'student', {}),
        exercise: e,
        submissions: _.get(exerciseProgress, 'submissions', [])
      });
    };

    $scope.guide = guide;
    $scope.exercisesProgress = _.map(guide.exercises, toExerciseProgress);

    $scope.atheneumLink = () => Domain.exerciseURLByBibliotheca(exerciseProgress.guide.slug, exerciseProgress.exercise.eid);

    let exerciseProgress = exerciseToView || $scope.exercisesProgress[0];

    const course = $stateParams.course;
    Breadcrumb.setCourse(course);
    Breadcrumb.setGuide(exerciseProgress.guide);
    Breadcrumb.setStudent(exerciseProgress.student);

    hotkeys
      .bindTo($scope)
      .add({
        combo: ['ctrl+left', 'shift+left'],
        description: $filter('translate')('next_exercise_description'),
        callback: () => $scope.selectExercise($scope.prevExercise()),
      })
      .add({
        combo: ['ctrl+right', 'shift+right'],
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
      return _.findIndex($scope.exercisesProgress, (p) => p.exercise.eid === currentExerciseId);
    };

    $scope.progressStatus = (progress) => _.get(_.last(progress.submissions), 'status', '');

    $scope.nextExercise = () => {
      const exercisesProgressIndex = currentExerciseProgressIndex();
      return $scope.exercisesProgress[Math.min(exercisesProgressIndex + 1, $scope.exercisesProgress.length - 1)];
    };

    $scope.prevExercise = () => {
      const exercisesProgressIndex = currentExerciseProgressIndex();
      return $scope.exercisesProgress[Math.max(exercisesProgressIndex - 1, 0)]
    };

    $scope.selectExercise = (exerciseProgress) => {
      currentExerciseId = exerciseProgress.exercise.eid;
      $stateParams.eid = currentExerciseId;
      const diffs = exerciseProgress.diffs || [];

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
        const numberBiggerThanDiffLength = number + $scope.limit >= diffs.length;

        return diffLengthBiggerThanLimit && numberBiggerThanDiffLength ? (diffs.length - $scope.limit) : number;
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
      $scope.lastSubmissionDate = Humanizer.date(_.get($scope, 'lastSubmission.created_at'));
      $scope.submissionsCount = exerciseProgress.submissions.length;
      $scope.progressSelected = (progress) => progress.exercise.eid === $scope.progress.exercise.eid;

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
          uid: $stateParams.student,
          exercise_id: exerciseProgress.exercise.eid,
          submission_id: submission.sid,
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

    };

    $scope.selectExercise(exerciseToView);

  });
