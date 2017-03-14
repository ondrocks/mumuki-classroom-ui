
angular
  .module('classroom')
  .factory('Assignment', function (Guide, Course, Student, Exercise, Submission, Diffs) {

    class Assignment {

      constructor(assignment = {}) {
        _.defaults(this, assignment);

        this.submissions = _.sortBy(this.submissions, 'created_at');
        this.diffs = Diffs.from(this.submissions);
      }

      getName() {
        return this.exercise.getName();
      }

      submissionsCount() {
        return _.get(this, 'submissions.length', 0);
      }

      lastSubmission() {
        return _.last(_.get(this, 'submissions', []));
      }

      static from(assignment) {
        assignment.guide = Guide.from(assignment.guide);
        assignment.course = Course.from(assignment.course);
        assignment.student = Student.from(assignment.student);
        assignment.exercise = Exercise.from(assignment.exercise);
        assignment.submissions = _.map(assignment.submissions, Submission.from);
        return new Assignment(assignment);
      }

    }

    return Assignment;

  })
