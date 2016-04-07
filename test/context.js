
function classroomTest(message, callback) {

  describe(message, function () {

    beforeEach(module('classroom'));
    beforeEach(inject(($location) => $location.host = () => 'pdep-utn.classroom.mumuki.io'));

    callback.bind(this)();

  });

}
