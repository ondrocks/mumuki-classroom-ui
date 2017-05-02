
angular
  .module('classroom')
  .service('Api', function ($http, $location, Course, Guide, Student, Teacher, GuideProgress, Assignment, Exam, Auth, Domain, Organization, CONFIG) {

    const API = () => Domain.classroomApiURL();
    const BIBLIOTHECA = () => Domain.bibliothecaApiURL();

    const authenticated = (requestOptions = {}) => _.defaultsDeep(requestOptions, {
      headers: { Authorization: `Bearer ${Auth.token()}` }
    });

    this.subdomain = Domain.tenant;

    this.getCourses = () => {
      return $http
        .get(`${API()}/courses`)
        .then((res) => _.map(res.data.courses, Course.from))
    };

    this.getCourseProgress = (course) => {
      return $http
        .get(`${API()}/courses/${course}/progress`)
        .then((res) => res.data)
    };

    this.getBibliothecaGuides = () => {
      return $http
        .get(`${BIBLIOTHECA()}/guides`)
        .then((res) => res.data.guides)
    }

    this.getBibliothecaGuide = ({org, repo}) => {
      return $http
        .get(`${BIBLIOTHECA()}/guides/${org}/${repo}/markdown`)
        .then((res) => Guide.from(res.data))
    };

    this.getGuides = ({ course }) => {
      return $http
        .get(`${API()}/courses/${course}/guides`)
        .then((res) => _.map(res.data.guides, Guide.from))
    };

    this.getGuideProgress = ({ org, course, repo }) => {
      return $http
        .get(`${API()}/courses/${course}/guides/${org}/${repo}`)
        .then((res) => ({
          guide: Guide.from(res.data.guide_students_progress[0].guide),
          guideProgress: _.map(res.data.guide_students_progress, GuideProgress.from)
        }))
    };

    this.getAssignments = ({ org, course, repo, student }) => {
      return $http
        .get(`${API()}/courses/${course}/guides/${org}/${repo}/${student}`)
        .then((res) => _.map(res.data.exercise_student_progress, Assignment.from))
    };

    this.getExams = ({ course }) => {
      return $http
        .get(`${API()}/courses/${course}/exams`)
        .then((res) => _.map(res.data.exams, Exam.from))
    };

    this.getExam = ({ course, exam }) => {
      return $http
        .get(`${API()}/courses/${course}/exams/${exam}`)
        .then((res) => Exam.from(res.data))
    };

    this.createCourse = (course) => {
      return $http
        .post(`${API()}/courses`, course)
    }

    this.createExam = (course, exam) => {
      return $http
        .post(`${API()}/courses/${course}/exams`, exam)
    }

    this.createStudent = (course, student) => {
      return $http
        .post(`${API()}/courses/${course}/students`, student)
    }

    this.updateStudent = (course, student) => {
      return $http
        .put(`${API()}/courses/${course}/student`, student)
    }

    this.getStudent = (course, uid) => {
      return $http
        .get(`${API()}/courses/${course}/student/${uid}`)
      }

    this.updateTeacher = (course, teacher) => {
      return $http
        .post(`${API()}/courses/${course}/teachers`, teacher)
    }

    this.updateExam = (course, exam) => {
      return $http
        .put(`${API()}/courses/${course}/exams/${exam.eid}`, exam)
    }

    this.getStudents = ({ course }) => {
      return $http
        .get(`${API()}/courses/${course}/students`)
        .then((res) => _.map(res.data.students, Student.from));
    }

    this.getTeachers = ({ course }) => {
      return $http
        .get(`${API()}/courses/${course}/teachers`)
        .then((res) => _.map(res.data.teachers, Teacher.from));
    }

    this.removeStudent = (uid, course) => {
      return $http
        .delete(`${API()}/courses/${course}/students/${uid}`)
    }

    this.detachStudent = (uid, course) => {
      return $http
        .post(`${API()}/courses/${course}/students/${uid}/detach`, {})
    }

    this.attachStudent = (uid, course) => {
      return $http
        .post(`${API()}/courses/${course}/students/${uid}/attach`, {})
    }

    this.transfer = (uid, course, destination) => {
      return $http
        .post(`${API()}/courses/${course}/students/${uid}/transfer`, { destination })
    }

    this.comment = (data, course) => {
      return $http
        .post(`${API()}/courses/${course}/comments`, data)
    }

    this.follow = (uid, email, course) => {
      return $http
        .post(`${API()}/courses/${course}/followers`, { uid, email, course })
    }

    this.unfollow = (uid, email, course) => {
      return $http
        .delete(`${API()}/courses/${course}/followers/${email}/${uid}`)
    }

    this.getFollowers = (email, course) => {
      return $http
        .get(`${API()}/courses/${course}/followers/${email}`)
        .then((data) => {
          const groupedData = _.groupBy(data.data.followers, "course");
          return _.forEach(groupedData, (v, k) => groupedData[k] = _.head(groupedData[k]));
        });
    }

    this.addPermission = (slug, email) => {
      return $http
        .post(`${API()}/courses/${slug}/permissions`, { email })
    }

    this.getOrganization = () => {
      return $http
        .get(`${API()}/organization`)
    }

    this.getPermissions = () => {
      return $http
        .get(`${API()}/permissions`)
        .then((res) => res.data);
    }

    this.addStudent = (course, student) => {
      return $http
        .post(`${API()}/courses/${course}/students`, student)
    }

    this.getLoginUrl = () => Domain.loginURL();
    this.getLogoutUrl = () => Domain.logoutURL();

    this.renderMarkdown = (markdown) => {
      return $http
        .post(`${BIBLIOTHECA()}/markdown`, { markdown })
        .then((res) => _.get(res, 'data.markdown'));
    };

  });
