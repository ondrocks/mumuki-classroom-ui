
classroomTest('Student Model', () => {

  var Student;

  beforeEach(inject((_Student_) => {
    Student = _Student_;
  }));

  describe('#fullName', () => {
    it('joins both names in a formal style', () => {
      new Student({first_name: 'Eva', last_name: 'Pineyro'}).fullName().should.eq('Pineyro, Eva');
    });
  });

});
