
angular
  .module('classroom')
  .factory('Exam', function () {

    class Exam {

      constructor(exam = {}) {
        _.defaults(this, exam);
      }

      getName() {
        return this.name;
      }

      fullName() {
        return `${this.name} - ${this.slug}`;
      }

      iconClass() {
        return `da da-${this.language}`;;
      }

      static from(exam) {
        return new Exam(exam);
      }

    }

    return Exam;

  })
