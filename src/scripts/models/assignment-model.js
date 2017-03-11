
angular
  .module('classroom')
  .factory('Assignment', function (Guide, Course, Student, Exercise, Submission) {

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

    class Diff {

      constructor(diff) {
        _.defaults(this, diff);
      }

      static from(value, i, array) {
        return new Diff({id: i, left: Submission.from(array[i - 1]), right: Submission.from(value) });
      }
    }

    class Diffs {

      constructor(submissions = []) {
        this._diffs = submissions.map(Diff.from);

        this._MIN = 0;
        this._MAX = this._diffs.length - 1;

        this.selected = this.last();
      }

      get length() {
        return this._diffs.length;
      }

      indexOf(diff) {
        return _.findIndex(this._diffs, ['id', _.get(diff, 'id')]);
      }

      selectedIndex() {
        return this.indexOf(this.selected);
      }

      isEmpty() {
        return this.length === 0;
      }

      prev() {
        return this._diffs[Math.max(this.selectedIndex() - 1, this._MIN)];
      }

      next() {
        return this._diffs[Math.min(this.selectedIndex() + 1, this._MAX)];
      }

      last() {
        return this._diffs[this._MAX];
      }

      first() {
        return this._diffs[this._MIN];
      }

      static from(submissions) {
        return new Diffs(submissions);
      }
    }

    return Assignment;

  })
