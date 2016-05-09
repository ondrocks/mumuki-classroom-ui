
angular
  .module('classroom')
  .factory('GuideProgress', function (Guide, Course, Student, Exercise, Submission) {

    class GuideProgress {

      constructor(guideProgress = {}) {
        if (!_.isNumber(guideProgress.last_assignment.exercise.number)) {
          guideProgress.last_assignment.exercise.number = '0';
        }
        _.defaults(this, guideProgress);
      }

      statistics() {
        const stats = this.stats;
        stats.total = stats.passed + stats.passed_with_warnings + stats.failed ;
        return stats;
      }

      colorClass() {
        const passedAverage = this.passedAverage();
        return passedAverage <= 0.4 ? 'low' :
               passedAverage <= 0.7 ? 'medium' : 'high';
      }

      passedAverage() {
        const stats = this.statistics();
        return (stats.passed / stats.total) || 0;
      }

      hasSubmissions() {
        return true;
      }

      lastSubmission() {
        return this.last_assignment.submission;
      };

      lastExerciseSubmitted() {
        return this.last_assignment.exercise;
      };

      static from(guideProgress) {
        guideProgress.course = Course.from(guideProgress.course);
        guideProgress.student = Student.from(guideProgress.student);
        guideProgress.last_assignment.exercise = Exercise.from(guideProgress.last_assignment.exercise);
        guideProgress.last_assignment.submission = Submission.from(guideProgress.last_assignment.submission);
        return new GuideProgress(guideProgress);
      }

    }

    return GuideProgress;

  })
