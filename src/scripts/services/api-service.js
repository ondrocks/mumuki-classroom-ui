
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
        .get(`${API}/courses/${course}/guides/${org}/${repo}/${student}/${exercise}`, authenticated())
        .then((res) => ExerciseProgress.from(res.data.exercise_progress))
    };

    this.createCourse = (course) => {
      return $http
        .post(`${API}/courses`, course, authenticated())
    }

    this.updateStudent = (course, { first_name, last_name }) => {
      return $http
        .post(`${API}/courses/${course}/students`, { first_name, last_name }, authenticated())
    }

    this.getStudents = ({ course }) => {
      return $http
        .get(`${API}/courses/${course}/students`, authenticated())
        .then((res) => _.map(res.data.students, Student.from));
    }

    this.getComments = (exercise_id, course) => {
      return $http
        .get(`${API}/courses/$course/comments/${exercise_id}`, authenticated())
        .then((res) => ({comments: res.data.comments}));
    }

    this.comment = (data, course) => {
      return $http
        .post(`${API}/courses/$course/comments`, { exercise_id: data.exercise_id, submission_id: data.submission_id, comment: data.comment }, authenticated())
    }

    this.follow = (social_id, email, course) => {
      return $http
        .post(`${API}/courses/$course/followers`, { social_id, email, course }, authenticated())
    }

    this.unfollow = (social_id, email, course) => {
      return $http
        .delete(`${API}/courses/$course/followers/${email}/${social_id}`, authenticated())
    }

    this.getFollowers = (email) => {
      return $http
        .get(`${API}/courses/$course/followers/${email}`, authenticated())
        .then((data) => {
          const groupedData = _.groupBy(data.data.followers, "course");
          return _.forEach(groupedData, (v, k) => groupedData[k] = _.head(groupedData[k]));
        });
    }

  });
