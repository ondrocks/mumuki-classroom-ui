
classroomTest('Domain Service', (mocks) => {

  beforeEach(inject((_$window_) => {
    mocks.window = sinon.mock(_$window_);
  }));

  it('#tenant', inject((Domain) => {
    Domain.tenant().should.be.eql('pdep-utn');
  }));

  it('#openLaboratory', inject((Domain) => {
    mocks.window.expects('open').once().withExactArgs('http://pdep-utn.localmumuki.io:3000', '_self');
    Domain.openLaboratory();
  }));

  it('#openExamInLaboratory', inject((Domain) => {
    mocks.window.expects('open').once().withExactArgs('http://pdep-utn.localmumuki.io:3000/exams/1234', '_blank');
    Domain.openExamInLaboratory(1234);
  }));

});
