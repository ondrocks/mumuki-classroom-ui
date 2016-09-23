
angular
  .module('classroom')
  .service('Api', function ($http, $location, Course, Guide, Student, Teacher, GuideProgress, ExerciseProgress, Exam, Auth, Domain, Organization, CONFIG) {

    const subdomain = Domain.tenant();
    const API = `http://${subdomain}.${CONFIG.classroom.url}`;

    const authenticated = (requestOptions = {}) => _.defaultsDeep(requestOptions, {
      headers: { Authorization: `Bearer ${Auth.token()}` }
    })

    this.subdomain = subdomain;

    this.getCourses = () => {
      return $http
        .get(`${API}/courses`, authenticated())
        .then((res) => _.map(res.data.courses, Course.from))
    };

    this.getCourseProgress = (course) => {
      return $http
        .get(`${API}/courses/${course}/progress`, authenticated())
        .then((res) => res.data)
    };

    this.getBibliothecaGuides = () => {
      return $http
        .get(`http://bibliotheca.mumuki.io/guides`, authenticated())
        .then((res) => res.data.guides)
    }

    this.getGuides = ({ course }) => {
      return $http
        .get(`${API}/courses/${course}/guides`, authenticated())
        .then((res) => _.map(res.data.guides, Guide.from))
    };

    this.getGuideProgress = ({ org, course, repo }) => {
      return $http
        .get(`${API}/courses/${course}/guides/${org}/${repo}`, authenticated())
        .then((res) => ({
          guide: Guide.from(res.data.guide_students_progress[0].guide),
          guideProgress: _.map(res.data.guide_students_progress, GuideProgress.from)
        }))
    };

    this.getExerciseProgress = ({ org, course, repo, student, exercise }) => {
      return $http
        .get(`${API}/courses/${course}/guides/${org}/${repo}/${student}`, authenticated())
        .then((res) => _.map(res.data.exercise_student_progress, ExerciseProgress.from))
    };

    this.getExams = ({ course }) => {
      return $http
        .get(`${API}/courses/${course}/exams`, authenticated())
        .then((res) => _.map(res.data.exams, Exam.from))
    };

    this.getExam = ({ course, exam }) => {
      return $http
        .get(`${API}/courses/${course}/exams/${exam}`, authenticated())
        .then((res) => Exam.from(res.data))
    };

    this.createCourse = (course) => {
      return $http
        .post(`${API}/courses`, course, authenticated())
    }

    this.createExam = (course, exam) => {
      return $http
        .post(`${API}/courses/${course}/exams`, exam, authenticated())
    }

    this.createStudent = (course, student) => {
      return $http
        .post(`${API}/courses/${course}/students`, student, authenticated())
    }

    this.updateStudent = (course, student) => {
      return $http
        .put(`${API}/courses/${course}/student`, student, authenticated())
    }

    this.getStudent = (course, social_id) => {
      return $http
        .get(`${API}/courses/${course}/student/${social_id}`, authenticated())
      }

    this.updateTeacher = (course, teacher) => {
      return $http
        .post(`${API}/courses/${course}/teachers`, teacher, authenticated())
    }

    this.updateExam = (course, exam) => {
      return $http
        .put(`${API}/courses/${course}/exams/${exam.id}`, exam, authenticated())
    }

    this.getStudents = ({ course }) => {
      return $http
        .get(`${API}/courses/${course}/students`, authenticated())
        .then((res) => _.map(res.data.students, Student.from));
    }

    this.getTeachers = ({ course }) => {
      return $http
        .get(`${API}/courses/${course}/teachers`, authenticated())
        .then((res) => _.map(res.data.teachers, Teacher.from));
    }

    this.removeStudent = (social_id, course) => {
      return $http
        .delete(`${API}/courses/${course}/students/${social_id}`, authenticated())
    }

    this.disableStudent = (social_id, course) => {
      return $http
        .post(`${API}/courses/${course}/students/${social_id}/detach`, {}, authenticated())
    }

    this.attachStudent = (social_id, course) => {
      return $http
        .post(`${API}/courses/${course}/students/${social_id}/attach`, {}, authenticated())
    }

    this.transfer = (social_id, course, destination) => {
      return $http
        .post(`${API}/courses/${course}/students/${social_id}/transfer`, { destination }, authenticated())
    }

    this.comment = (data, course) => {
      return $http
        .post(`${API}/courses/${course}/comments`, data, authenticated())
    }

    this.follow = (social_id, email, course) => {
      return $http
        .post(`${API}/courses/${course}/followers`, { social_id, email, course }, authenticated())
    }

    this.unfollow = (social_id, email, course) => {
      return $http
        .delete(`${API}/courses/${course}/followers/${email}/${social_id}`, authenticated())
    }

    this.getFollowers = (email, course) => {
      return $http
        .get(`${API}/courses/${course}/followers/${email}`, authenticated())
        .then((data) => {
          const groupedData = _.groupBy(data.data.followers, "course");
          return _.forEach(groupedData, (v, k) => groupedData[k] = _.head(groupedData[k]));
        });
    }

    this.addPermission = (slug, email) => {
      return $http
        .post(`${API}/courses/${slug}/permissions`, { email }, authenticated())
    }

    this.getOrganization = () => {
      return $http
        .get(`${API}/organization`)
    }

  });
