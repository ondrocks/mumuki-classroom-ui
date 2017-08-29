
angular
  .module('classroom')
  .service('CurrentCourse', function () {

    this._course = null;

    this.set = (course) => {
      this._course = course;
    }

    this.get = () => {
      return this._course;
    }

  });
