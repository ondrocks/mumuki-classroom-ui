
classroomTest('Domain Service', (mocks) => {

  beforeEach(inject((_$window_) => {
    mocks.window = sinon.mock(_$window_);
  }));

  it('#tenant', inject((Domain) => {
    Domain.tenant().should.be.eql('pdep-utn');
  }));

  it('#openAtheneum', inject((Domain) => {
    mocks.window.expects('open').once().withExactArgs('http://pdep-utn.mumuki.io', '_self');
    Domain.openAtheneum();
  }));

  it('#openExamInAtheneum', inject((Domain) => {
    mocks.window.expects('open').once().withExactArgs('http://pdep-utn.mumuki.io/exams/1234', '_blank');
    Domain.openExamInAtheneum(1234);
  }));

});
