
classroomTest('New Exam Controller', () => {

  let $scope;
  const date = moment().toDate();

  beforeEach(inject((_$rootScope_, _$controller_) => {
    $scope = _$rootScope_.$new();
    $scope.selected = {};
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

  describe('#getExam', () => {
    let exam;

    beforeEach(() => {
      $scope.exam = {
        start_time: date,
        end_time: date,
        duration: 60
      };
    });

    beforeEach(() => exam = $scope.getExam());

    it('should has correct slug', () => exam.slug.should.be.eql('mumuki/mumuki-guia-funcional'));
    it('should has correct name', () => exam.name.should.be.eql('mumuki guia funcional'));
    it('should has correct duration', () => exam.duration.should.be.eql(60));
    it('should has correct end_time', () => exam.end_time.should.be.eql(date));
    it('should has correct language', () => exam.language.should.be.eql('haskell'));
    it('should has correct start_time', () => exam.start_time.should.be.eql(date));
  });

});
