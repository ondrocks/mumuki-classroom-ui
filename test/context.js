
function classroomTest(message, callback) {

  let mocks = {};

  afterEach(() => {
    _.forIn(mocks, (mock) => {
      mock.verify();
      mock.restore();
    })
  });

  describe(message, function () {

    beforeEach(module('classroom'));
    beforeEach(inject((_$location_) => _$location_.host = () => 'pdep-utn.classroom.mumuki.io'));

    callback.bind(this)(mocks);

  });

}
