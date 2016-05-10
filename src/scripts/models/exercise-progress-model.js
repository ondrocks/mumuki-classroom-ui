
angular
  .module('classroom')
  .factory('ExerciseProgress', function (Guide, Course, Student, Exercise, Submission) {

    class ExerciseProgress {

      constructor(exerciseProgress = {}) {
        _.defaults(this, exerciseProgress);

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

      static from(exerciseProgress) {
        exerciseProgress.guide = Guide.from(exerciseProgress.guide);
        exerciseProgress.course = Course.from(exerciseProgress.course);
        exerciseProgress.student = Student.from(exerciseProgress.student);
        exerciseProgress.exercise = Exercise.from(exerciseProgress.exercise);
        exerciseProgress.submissions = _.map(exerciseProgress.submissions, Submission.from);
        return new ExerciseProgress(exerciseProgress);
      }

    }

    return ExerciseProgress;

  })
