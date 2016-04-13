
angular
  .module('classroom')
  .factory('Student', function () {

    class Student {

      constructor(student = {}) {
        _.defaults(this, student);
      }

      fullName() {
        return `${this._capitalize(this.last_name)}, ${this._capitalize(this.first_name)}`
      }

      static from(student) {
        return new Student(student);
      }

      _capitalize(name) {
        return _(name).split(' ').map(_.capitalize).join(' ');
      }

    }

    return Student;

  })
