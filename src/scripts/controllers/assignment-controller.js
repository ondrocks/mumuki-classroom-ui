
angular
  .module('classroom')
  .controller('AssignmentController', function ($scope, $state, $sce, $stateParams, $timeout, $filter, toastr, hotkeys, guide, guideProgress, assignments, containsHtml, Assignment, Auth, Api, Breadcrumb, Preferences, Humanizer, Domain, Student) {

    Preferences($scope, 'options');

    const SPLIT = { type: 'side-by-side', name: 'split' };
    const UNIFIED = { type: 'line-by-line', name: 'unified' };
    const LAST_SOLUTION = { type: 'only-last', name: 'last_solution' };

    const toAssignment = (exercise, index) => {
      const currentAssignment = _.find(assignments, (assignment) => assignment.exercise.eid === exercise.id);
      exercise = _.merge(exercise, {
        eid: (_.get(currentAssignment, 'exercise.eid') === exercise.id ? currentAssignment.exercise.eid : exercise.id),
        number: index + 1
      });
      const assignment = _.find(assignments, (assignment) => exercise.eid === assignment.exercise.eid);
      return Assignment.from({
        guide: _.omit(guide, 'exercises'),
        student: _.get(assignments[0], 'student', {}),
        exercise: exercise,
        submissions: _.get(assignment, 'submissions', [])
      });
    };

    let currentExercise;
    let currentAssignment;

    $scope.guide = guide;
    $scope.assignments = _.map(guide.exercises, toAssignment);

    let assignment = _.find($scope.assignments, (assignment) => assignment.exercise.eid === Number($stateParams.eid)) || $scope.assignments[0]

    const course = $stateParams.course;
    Breadcrumb.setCourse(course);
    Breadcrumb.setGuide(assignment.guide);
    Breadcrumb.setStudent(assignment.student);
    Breadcrumb.setStudents(_.map(guideProgress, (assignment) => Student.from(assignment.student)));

    hotkeys
      .bindTo($scope)
      .add({
        combo: ['ctrl+left', 'shift+left'],
        description: $filter('translate')('next_exercise_description'),
        callback: () => $scope.selectAssignment($scope.prevAssignment()),
      })
      .add({
        combo: ['ctrl+right', 'shift+right'],
        description: $filter('translate')('prev_exercise_description'),
        callback: () => $scope.selectAssignment($scope.nextAssignment()),
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

    const currentAssignmentIndex = () => {
      return _.findIndex($scope.assignments, (p) => p.exercise.eid === currentExercise.eid);
    };

    $scope.lastSolutionMarkdown = {};
    $scope.$watch('lastSolutionMarkdown', () => {}, true);

    $scope.assignmentStatus = (assignment) => _.get(_.last(assignment.submissions), 'status', '');

    $scope.nextAssignment = () => {
      const assignmentsIndex = currentAssignmentIndex();
      return $scope.assignments[Math.min(assignmentsIndex + 1, $scope.assignments.length - 1)];
    };

    $scope.prevAssignment = () => {
      const assignmentsIndex = currentAssignmentIndex();
      return $scope.assignments[Math.max(assignmentsIndex - 1, 0)]
    };

    $scope.selectAssignment = (assignment) => {
      currentExercise = assignment.exercise;
      $stateParams.eid = currentExercise.eid;
      const diffs = assignment.diffs || [];

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
      $scope.assignment = assignment;
      $scope.lastSubmission = _.last(assignment.submissions);
      $scope.lastSubmissionDate = Humanizer.date(_.get($scope, 'lastSubmission.created_at'));
      $scope.submissionsCount = assignment.submissions.length;
      $scope.assignmentSelected = (assignment) => assignment.exercise.eid === $scope.assignment.exercise.eid;

      $scope.selectDiff(diffs[MAX]);

      $scope.time = (comment) => moment(comment.date).fromNow();

      $scope.isLastSolutionActivated = () => _.isEqual($scope.options.viewMode, LAST_SOLUTION);
      $scope.getViewMode = () => $scope.options.viewMode;

      $scope.split = () => $scope.options.viewMode = SPLIT;
      $scope.unified = () => $scope.options.viewMode = UNIFIED;
      $scope.lastSolution = () => {
        const lastDiff = $scope.lastDiff();
        $scope.selectDiff(lastDiff);
        $scope.options.viewMode = LAST_SOLUTION;
      };

      $scope.submissionHasComments = (submission) => {
        return !_.isEmpty(submission.comments);
      }
      $scope.hasComments = (assignment) => {
        return _.some(assignment.submissions, (submission) => $scope.submissionHasComments(submission));
      }
      $scope.showCommentsIcon = (assignment) => {
        return $scope.submissionHasComments(assignment.lastSubmission());
      };
      $scope.showNewCommentsIcon = (assignment) => {
        return !$scope.showCommentsIcon(assignment) && $scope.hasComments(assignment);
      };

      const getCommentToPost = (submission) => {
        return {
          uid: $stateParams.student,
          exercise_id: assignment.exercise.eid,
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
      };

      if (!$scope.lastSolutionMarkdown[currentExercise.eid]) {
        Api
          .renderMarkdown(`\`\`\`${guide.language}\n${_.get($scope.lastDiff(), 'right.content')}\n\`\`\``)
          .then((markdown) => $scope.lastSolutionMarkdown[currentExercise.eid] = markdown);
      }

    };

    $scope.selectAssignment(assignment);

  });
