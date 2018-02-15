
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
    beforeEach(inject((_$location_) => _$location_.host = () => 'http://pdep-utn.classroom.localmumuki.io'));

    callback.bind(this)(mocks);

  });

}
