
classroomTest('New Exam Controller', () => {

  let $scope;
  let date = moment().toDate();

  beforeEach(inject((_$rootScope_, _$controller_, _$state_) => {
    $scope = _$rootScope_.$new();
    _$controller_('NewExamController', {
      $scope: $scope,
      guides: []
    });
  }));

  beforeEach(() => {
    $scope.selected.guide = {
      slug: 'mumuki/mumuki-guia-funcional',
      name: 'mumuki guia funcional',
      language: 'haskell'
    };
  });

  beforeEach(() => {
    $scope.exam = {
      start_time: date,
      end_time: date,
      duration: 60
    };
  });

  describe('#isValidGuide', () => {

    const shouldBe = (field) => () => {
      delete $scope.selected.guide[field];
      $scope.isValidGuide().should.be.eql(false);
    };

    describe('should returns false', () => {
      it('when name is missing', shouldBe('name'));
      it('when slug is missing', shouldBe('slug'));
      it('when language is missing', shouldBe('language'));
    });

    describe('should returns true', () => {
      it('when selected.guide has name, slug and language', () => {
        $scope.isValidGuide().should.be.eql(true);
      });
    });

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

  describe('#duration', () => {

    describe('should returns false', () => {
      it('when duration is missing', () => {
        delete $scope.exam.duration;
        $scope.isValidDuration().should.be.eql(false);
      });
      it('when duration is zero', () => {
        $scope.exam.duration = 0
        $scope.isValidDuration().should.be.eql(false);
      });
      it('when duration is lower than zero', () => {
        $scope.exam.duration = -1;
        $scope.isValidDuration().should.be.eql(false);
      });
    });

    describe('should returns false', () => {
      it('when duration is greater than zero', () => {
        $scope.isValidDuration().should.be.eql(true);
      });
    });

  });

  describe('#getExam', () => {
    let exam;

    beforeEach(() => exam = $scope.getExam());

    it('should has correct slug', () => exam.slug.should.be.eql('mumuki/mumuki-guia-funcional'));
    it('should has correct name', () => exam.name.should.be.eql('mumuki guia funcional'));
    it('should has correct duration', () => exam.duration.should.be.eql(60));
    it('should has correct end_time', () => exam.end_time.should.be.eql(date));
    it('should has correct language', () => exam.language.should.be.eql('haskell'));
    it('should has correct start_time', () => exam.start_time.should.be.eql(date));
  });

});
