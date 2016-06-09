
classroomTest('Preferences Service', () => {

  let $scope;

  beforeEach(inject((_$rootScope_, _$cookies_, _$state_) => {
    $scope = _$rootScope_.$new();
    _$state_.current.name = 'test';
    _$cookies_.remove('test-foo');
  }));

  it('should inject cookie value saved at key to scope', inject((_$cookies_, Preferences) => {
    _$cookies_.putObject('test-foo', { value: 'bar' });
    Preferences($scope, 'foo');
    $scope.foo.should.be.eql('bar');
  }));

  it('should not inject cookie value to scope if cookie is empty', inject((_$cookies_, Preferences) => {
    Preferences($scope, 'foo');
    expect(_$cookies_.getObject('test-foo')).be.undefined;
  }));

  it('should save value in cookie if scope has the key', inject((_$cookies_, Preferences) => {
    Preferences($scope, 'foo');
    $scope.foo = 'bar';
    $scope.$digest();
    _$cookies_.getObject('test-foo').should.be.eql({ value: 'bar' });
  }));

  it('should save remove the cookie if key change to nullable value', inject((_$cookies_, Preferences) => {
    Preferences($scope, 'foo');
    $scope.foo = 'bar';
    $scope.$digest();
    $scope.foo = null;
    $scope.$digest();
    expect(_$cookies_.getObject('test-foo')).be.undefined;
  }));

});
