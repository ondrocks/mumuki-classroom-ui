
angular
  .module('classroom')
  .service('Domain', function ($location, $stateParams, $window, OrganizationMapper) {

    const openAth = (mode, path='') => {
      $window.open(`${this.atheneumURL()}${path}`, mode);
      return true;
    }

    this.openAtheneum = () => openAth('_self');
    this.openExamInAtheneum = (exam) => openAth('_blank', `/exams/${exam}`);

    this.tosURL = () => `${atheneumURL()}/static/tos/tos-${this.currentLocale()}.txt`

    this.guideURL = (slug) => `${atheneumURL()}/guides/${slug}`

    this.exerciseURL = (exerciseId) => `${this.atheneumURL()}/exercises/${exerciseId}`;
    this.exerciseURLByBibliotheca = (guideSlug, exerciseId) => `${this.atheneumURL()}/exercises/${guideSlug}/${exerciseId}`;

    this.examURL = (exam) => `${this.atheneumURL()}/exams/${exam}`;


    this.tenant = () => OrganizationMapper.tenant();
    this.atheneumURL = () => OrganizationMapper.atheneumURL();
    this.classroomApiURL = () => OrganizationMapper.classroomApiURL();
    this.bibliothecaApiURL = () => OrganizationMapper.bibliothecaApiURL();

  });
