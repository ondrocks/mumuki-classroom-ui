
classroomTest('Domain Service', () => {

  it('#tenant', inject((Domain) => {
    Domain.tenant().should.be.eql('pdep-utn');
  }));

});
