
angular
  .module('classroom')
  .service('Api', function ($http, $location, Course, Guide, Student, GuideProgress, ExerciseProgress, Auth, Domain, CONFIG) {

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

    this.getGuides = ({ course }) => {
      return $http
        .get(`${API}/courses/${course}`, authenticated())
        .then((res) => _.map(res.data.course_guides, Guide.from))
    };

    this.getGuideProgress = ({ org, course, repo }) => {
      return $http
        .get(`${API}/guide_progress/${course}/${org}/${repo}`, authenticated())
        .then((res) => ({guide: res.data.guide, guideProgress: _.map(res.data.progress, GuideProgress.from)}))
    };

    this.getExerciseProgress = ({ org, course, repo, student, exercise }) => {
      return $http
        .get(`${API}/guide_progress/${course}/${org}/${repo}/${student}/${exercise}`, authenticated())
        .then((res) => ExerciseProgress.from(res.data.exercise_progress))
    };

    this.createCourse = ({ name, description }) => {
      return $http
        .post(`${API}/courses`, { name: name.toLowerCase(), description: description }, authenticated())
    }

    this.updateStudent = (course, { first_name, last_name }) => {
      return $http
        .post(`${API}/courses/${course}/students`, { first_name, last_name }, authenticated())
    }

    this.getStudents = ({ course }) => {
      return $http
        .get(`${API}/students/${course}`, authenticated())
        .then((res) => _.map(res.data.students, Student.from));
    }

    this.getComments = (submission_id) => {
      return $http
        .get(`${API}/comments/${submission_id}`, authenticated())
        .then((res) => ({comments: res.data.comments}));
    }

    this.comment = (data, course) => {
      return $http
        .post(`${API}/comment/${course}`, { exercise_id: data.exercise_id, submission_id: data.submission_id, comment: data.comment }, authenticated())
    }

    this.follow = (social_id, email, course) => {
      return $http
        .post(`${API}/follower/${course}`, { social_id, email, course }, authenticated())
    }

    this.unfollow = (social_id, email, course) => {
      return $http
        .delete(`${API}/follower/${course}/${email}/${social_id}`, authenticated())
    }

    this.getFollowers = (email) => {
      return $http
        .get(`${API}/followers/${email}`, authenticated())
    }

  });
