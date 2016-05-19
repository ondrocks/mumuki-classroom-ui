
angular
  .module('classroom')
  .service('Breadcrumb', function ($state, $stateParams) {

    this.list = () => {
      return this._list.filter((item) => $state.includes(item.state));
    }

    this.goTo = (item) => {
      return $state.go(item.state, $stateParams, { reload: true });
    }

    this.getGuideName = () => {
      return this._guide && this._guide.getName();
    }

    this.getStudentName = () => {
      return this._student && this._student.getName();
    }

    this.getExamName = () => {
      return this._exam && this._exam.getName();
    }

    this.setGuide = (guide) => {
      this._guide = guide;
    }

    this.setStudent = (student) => {
      this._student = student;
    }

    this.setExam = (exam) => {
      this._exam = exam;
    }

    this._guide = null;
    this._student = null;
    this._list = [
      { name: () => 'courses', state: 'classroom.courses' },
      { name: () => 'guides', state: 'classroom.courses.course.guides' },
      { name: () => 'students', state: 'classroom.courses.course.students' },
      { name: () => 'exams', state: 'classroom.courses.course.exams' },
      { name: () => 'new_exam', state: 'classroom.courses.course.exams.new' },
      { name: () => this.getExamName(), state: 'classroom.courses.course.exams.edit' },
      { name: () => this.getGuideName(), state: 'classroom.courses.course.guides.guide' },
      { name: () => this.getStudentName(), state: 'classroom.courses.course.guides.guide.students' }
    ];

  });
