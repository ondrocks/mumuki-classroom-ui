
angular
  .module('classroom')
  .factory('Exam', function (DevIcon) {

    class Exam {

      constructor(exam = {}) {
        _.defaults(this, exam);
      }

      getName() {
        return this.name;
      }

      iconClass() {
        return `devicons devicons-${DevIcon.from(this.language)}`;;
      }

      static from(exam) {
        return new Exam(exam);
      }

    }

    return Exam;

  })
