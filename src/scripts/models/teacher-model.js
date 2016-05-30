
angular
  .module('classroom')
  .factory('Teacher', function () {

    class Teacher {

      constructor(teacher = {}) {
        _.defaults(this, teacher);
      }

      fullName() {
        return `${this._capitalize(this.last_name)}, ${this._capitalize(this.first_name)}`
      }

      getName() {
        return this.fullName();
      }

      static from(teacher) {
        return new Teacher(teacher);
      }

      _capitalize(name) {
        return _(name).split(' ').map(_.capitalize).join(' ');
      }

    }

    return Teacher;

  })
