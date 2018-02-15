
classroomTest('Organization Mapper', () => {

  var host;

  beforeEach(inject((_$location_) => _$location_.host = () => host));

  describe('#tenant', () => {

    it('accepts simple tenants', inject((Domain) => {
      host = 'pdep-utn.classroom.localmumuki.io';

      Domain.tenant().should.eq('pdep-utn')
    }));

    it('accepts tenants with subdomains', inject((Domain) => {
      host = 'pdep.utn.classroom.localmumuki.io';

      Domain.tenant().should.eq('pdep.utn')
    }));
  });
});
