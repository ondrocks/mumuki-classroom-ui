
angular
  .module('classroom')
  .service('Domain', function ($location, $stateParams, $window, OrganizationMapper) {

    const openAth = (mode, path='') => {
      $window.open(`${this.atheneumURL()}${path}`, mode);
      return true;
    }

    this.atheneumURL = () => `${$location.protocol()}://${this.tenant()}.mumuki.io`;
    this.exerciseURL = (exerciseId) => `${this.atheneumURL()}/exercises/${exerciseId}`;
    this.exerciseURLByBibliotheca = (guideSlug, exerciseId) => `${this.atheneumURL()}/exercises/${guideSlug}/${exerciseId}`;

    this.tenant = () => OrganizationMapper.tenant();

    this.openAtheneum = () => openAth('_self');
    this.openExamInAtheneum = (exam) => openAth('_blank', `/exams/${exam}`);
    this.examURL = (exam) => `${this.atheneumURL()}/exams/${exam}`;

    this.classroomApiURL = () => OrganizationMapper.classroomApiURL();

  });
