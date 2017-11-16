
classroomTest('Permissions Service', () => {

  context('Teacher', () => {

    it('#teacherPermissions', inject((Permissions) => {
      Permissions.set({ teacher: 'foo/bar:baz/bar', headmaster: 'pdep-utn/*' });
      Permissions.teacherPermissions().should.be.eql(['foo/bar', 'baz/bar']);
    }));

    it('#isTeacher', inject((Permissions) => {
      Permissions.set({ teacher: 'foo/bar:baz/bar', headmaster: 'pdep-utn/*' });
      Permissions.isTeacher().should.be.eql(true);
    }));

    it('#isTeacher', inject((Permissions) => {
      Permissions.set({ teacher: 'foo/bar:baz/bar', headmaster: 'pdep-utn/course-foo' });
      Permissions.isTeacher().should.be.eql(true);
    }));

    it('#isTeacher', inject((Permissions) => {
      Permissions.set({ teacher: 'foo/bar:baz/bar', headmaster: 'foo/*' });
      Permissions.isTeacher().should.be.eql(false);
    }));

  });


});
