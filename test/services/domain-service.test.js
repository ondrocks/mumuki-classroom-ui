
classroomTest('Domain Service', (mocks) => {

  beforeEach(inject((_$window_) => {
    mocks.window = sinon.mock(_$window_);
  }));

  it('#tenant', inject((Domain) => {
    Domain.tenant().should.be.eql('pdep-utn');
  }));

  it('#openAtheneum', inject((Domain, _$window_) => {
    mocks.window.expects('open').once().withExactArgs('http://pdep-utn.mumuki.io', '_self');
    Domain.openAtheneum();
  }));

});
