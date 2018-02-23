angular
  .module('classroom')
  .service('Languages', function(Language) {

    let _languages;

    this.get = () => {
      return _languages;
    }

    this.set = (languages = []) => {
      _languages = _(languages).map(Language.from).sortBy('name').value();
    }

    this.fromName = (name) => {
      return Language.from(_.find(this.get(), { name }));
    }

  });
