
describe('Domain Service', () => {

  beforeEach(module('classroom'));

  let $location;

  beforeEach(inject((_$location_) => {
    $location = sinon.mock(_$location_);
    $location.expects('host').returns('pdep-utn.classroom.mumuki.io');
  }));

  afterEach(() => {
    $location.restore();
  });

  it('#tenant', inject((Domain) => {
    Domain.tenant().should.be.eql('pdep-utn');
  }));

});
