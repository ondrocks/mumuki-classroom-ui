
angular
  .module('classroom')
  .service('Breadcrumb', function ($state, $stateParams) {

    this.list = () => {
      return this._list.filter((item) => $state.includes(item.state));
    };

    this.goTo = (item) => {
      return $state.go(item.state, $stateParams, { reload: true });
    };

    this.getGuideName = () => {
      return this._guide && this._guide.getName();
    };

    this.getStudent = () => {
      return this._student;
    };

    this.getStudentName = () => {
      return this._student && this._student.getName();
    };

    this.getStudentImage = () => {
      return this._student && this._student.image_url;
    };

    this.getExamName = () => {
      return this._exam && this._exam.getName();
    };

    this.getExercise = () => {
      return this._exercise;
    };

    this.setCourse = (course) => {
      this._course = course;
    };

    this.setGuide = (guide) => {
      this._guide = guide;
    };

    this.setStudent = (student) => {
      this._student = student;
    };

    this.setExam = (exam) => {
      this._exam = exam;
    };

    this.setStudents = (students) => {
      this._students = students;
    };

    this.setExercise = (exercise) => {
      this._exercise = exercise;
    };

    this.getStudents = () => {
      return this._students;
    };

    this.inCoursesNamespace = () => {
      return $state.current.name != 'classroom.students.list';
    };

    this._course = null;
    this._guide = null;
    this._student = null;
    this._list = [
      { name: () => 'notifications', state: 'classroom.notifications' },
      { name: () => 'students', state: 'classroom.students.list' },
      { name: () => this._course, state: 'classroom.courses.course.guides' },
      { name: () => this._course, state: 'classroom.courses.course.exams' },
      { name: () => this._course, state: 'classroom.courses.course.students' },
      { name: () => this._course, state: 'classroom.courses.course.teachers' },
      { name: () => this._course, state: 'classroom.students.new' },
      { name: () => 'new_exam', state: 'classroom.courses.course.exams.new' },
      { name: () => this.getExamName(), state: 'classroom.courses.course.exams.edit' },
      { name: () => this.getGuideName(), state: 'classroom.courses.course.guides.guide' },
      { name: () => this.getStudentName(), state: 'classroom.courses.course.guides.guide.students', student: true, students: this.getStudents, image: () => this.getStudentImage() }
    ];

  });
