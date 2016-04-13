
classroomTest('Student Model', () => {

  var Student;

  beforeEach(inject((_Student_) => {
    Student = _Student_;
  }));

  describe('#fullName', () => {
    it('joins both names in a formal style', () => {
      new Student({first_name: 'Eva', last_name: 'Pineyro'}).fullName().should.eq('Pineyro, Eva');
    });

    it('capitalizes the first letter of each name', () => {
      new Student({first_name: 'josé francisco', last_name: 'de san martín'}).fullName().should.eq('De San Martín, José Francisco');
    });
  });

});
