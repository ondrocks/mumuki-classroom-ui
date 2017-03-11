
angular
  .module('classroom')
  .factory('Guide', function (Domain) {

    class Guide {

      constructor(guide = {}) {
        _.defaults(this, guide);
      }

      getName() {
        return this.name;
      }

      getMumukiURL() {
        return `http://${Domain.tenant()}.mumuki.io/guides/${this.slug}`;
      }

      iconClass() {
        return `da da-${_.get(this, 'language.name') || _.get(this, 'language')}`;;
      }

      static from(guide) {
        return new Guide(guide);
      }

    }

    return Guide;

  })
