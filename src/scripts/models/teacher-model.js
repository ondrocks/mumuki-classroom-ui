
angular
  .module('classroom')
  .factory('Teacher', function (ICONS) {

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

      provider() {
        return _.get(this, 'social_id', '').split('|')[0];
      }

      providerIcon() {
        return ICONS.get(this.provider());
      }

      _capitalize(name) {
        return _(name).split(' ').map(_.capitalize).join(' ');
      }

      static from(teacher) {
        return new Teacher(teacher);
      }

    }

    return Teacher;

  })
