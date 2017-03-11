
angular
  .module('classroom')
  .factory('Assignment', function (Guide, Course, Student, Exercise, Submission) {

    class Assignment {

      constructor(assignment = {}) {
        _.defaults(this, assignment);

        this.diffs = [];
        this.submissions = _.sortBy(this.submissions, 'created_at');

        _.forEach(this.submissions, (value, i, array) => {
          this.diffs.push({ left: Submission.from(array[i - 1]), right: Submission.from(value) });
        });
      }

      getName() {
        return this.exercise.getName();
      }

      submissionsCount() {
        return _.get(this, 'submissions.length', 0);
      }

      lastSubmission() {
        return _.maxBy(_.get(this, 'submissions', []), 'created_at');
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
