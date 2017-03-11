
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

    $scope.guide = guide;
    $scope.assignments = _.map(guide.exercises, toAssignment);

    const assignment = _.find($scope.assignments, (assignment) => assignment.exercise.eid === Number($stateParams.eid)) || $scope.assignments[0]
    const course = $stateParams.course;

    Breadcrumb.setCourse(course);
    Breadcrumb.setGuide(assignment.guide);
    Breadcrumb.setStudent(assignment.student);
    Breadcrumb.setStudents(_.map(guideProgress, (assignment) => Student.from(assignment.student)));

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

      if (_.isEmpty($scope.options)) $scope.options = { viewMode: UNIFIED };

      currentExercise = assignment.exercise;

      $stateParams.eid = currentExercise.eid;

      $scope.assignment = assignment;
      $scope.containsHtml = containsHtml;
      $scope.lastSubmissionDate = Humanizer.date(_.get($scope, 'lastSubmission.created_at'));


      $scope.trust = (html) => $sce.trustAsHtml(html);
      $scope.selectDiff = (diff) => assignment.diffs.selected = diff;
      $scope.isSelectedDiff = (diff) => assignment.diffs.isSelected(diff);
      $scope.assignmentSelected = (assignment) => assignment.exercise.eid === $scope.assignment.exercise.eid;

      $scope.time = (comment) => moment(comment.date).fromNow();
      $scope.isLastSolutionActivated = () => _.isEqual($scope.options.viewMode, LAST_SOLUTION);
      $scope.getViewMode = () => $scope.options.viewMode;

      $scope.split = () => $scope.options.viewMode = SPLIT;
      $scope.unified = () => $scope.options.viewMode = UNIFIED;
      $scope.lastSolution = () => {
        assignment.diffs.selectLast();
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
          .renderMarkdown(`\`\`\`${guide.language}\n${_.get(assignment.diffs.last(), 'right.content', '').trim()}\n\`\`\``)
          .then((markdown) => $scope.lastSolutionMarkdown[currentExercise.eid] = markdown);
      }

    };

    $scope.selectAssignment(assignment);

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
            $scope.assignment.diffs.selectPrev();
          }
        }
      })
      .add({
        combo: ['right'],
        description: $filter('translate')('prev_solution_description'),
        callback: () => {
          if (!_.isEqual($scope.options.viewMode, LAST_SOLUTION)) {
            $scope.assignment.diffs.selectNext();
          }
        },
      });

  });
