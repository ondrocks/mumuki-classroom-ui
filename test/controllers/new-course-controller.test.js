
classroomTest('New Course Controller', () => {

  let $scope;

  beforeEach(inject((_$rootScope_, _$controller_, _$state_) => {
    $scope = _$rootScope_.$new();
    _$controller_('NewCourseController', { $scope });
  }));

  describe('#getCourseToPost', () => {

    beforeEach(() => {
      $scope.course = {
        shifts: [{ name: 'shift_morning', checked: true }, { name: 'shift_night', checked: true }, ],
        days: [{ name: 'day_monday', checked: true }, { name: 'day_friday', checked: true }],
        code: 'k3000',
        period: '2016',
        description: 'Foo course for testing'
      };
    });

    const shouldBe = (field, expected) => $scope.getCourseToPost()[field].should.be.eql(expected);

    it('should generate correctly slug', () => shouldBe('slug', 'pdep-utn/2016-k3000'));
    it('should generate correctly code', () => shouldBe('code', 'k3000'));
    it('should generate correctly days', () => shouldBe('days', ['Monday', 'Friday']));
    it('should generate correctly shifts', () => shouldBe('shifts', ['Morning', 'Night']));
    it('should generate correctly period', () => shouldBe('period', '2016'));

  });

});
