
classroomTest('Exam Controller', () => {

  let $scope;
  const date = moment().toDate();

  beforeEach(inject((_$rootScope_, _$controller_) => {
    $scope = _$rootScope_.$new();
    _$controller_('ExamController', { $scope });
  }));

  beforeEach(() => {
    $scope.exam = {
      start_time: date,
      end_time: date,
      duration: 60
    };
  });

  describe('#isValidStartTime', () => {

    describe('should returns false', () => {
      it('when start_time and end_time are missing', () => {
        delete $scope.exam.start_time;
        delete $scope.exam.end_time;
        $scope.isValidStartTime().should.be.eql(false);
      });
      it('when start_time is missing', () => {
        delete $scope.exam.start_time;
        $scope.isValidStartTime().should.be.eql(false);
      });
      it('when end_time is missing', () => {
        delete $scope.exam.end_time;
        $scope.isValidStartTime().should.be.eql(false);
      });
    });

  });

  describe('#isValidEndTime', () => {

    describe('should returns false', () => {
      it('when start_time and end_time are missing', () => {
        delete $scope.exam.start_time;
        delete $scope.exam.end_time;
        $scope.isValidEndTime().should.be.eql(false);
      });
      it('when start_time is missing', () => {
        delete $scope.exam.start_time;
        $scope.isValidEndTime().should.be.eql(false);
      });
      it('when end_time is missing', () => {
        delete $scope.exam.end_time;
        $scope.isValidEndTime().should.be.eql(false);
      });
    });

  });

  describe('#isValidDuration', () => {

    describe('if has duration should returns false', () => {
      it('should returns false when duration is zero', () => {
        $scope.hasDuration = true;
        $scope.exam.duration = 0
        $scope.isValidDuration().should.be.eql(false);
      });
      it('when duration is lower than zero', () => {
        $scope.hasDuration = true;
        $scope.exam.duration = -1;
        $scope.isValidDuration().should.be.eql(false);
      });
    });

    describe('if has no duration should returns true', () => {
      it('when duration is missing', () => {
        $scope.hasDuration = false;
        $scope.isValidDuration().should.be.eql(true);
      });
      it('when duration is greater than zero', () => {
        $scope.hasDuration = true;
        $scope.isValidDuration().should.be.eql(true);
      });
    });

  });

});
