
angular
  .module('classroom')
  .service('Followers', function (Api, Auth) {

    this.followers = {};

    this.setFollowers = (followers) => {
      return this.followers = followers;
    }

    this.doFollow = (course, social_id) => {
      this.followers[course] = this.followers[course] || [];
      return this.followers[course].length !== 0 && _.includes(this.course(course).social_ids, social_id);
    }

    this.course = (course) => _.head(this.followers[course])

    this.addFollower = (course, social_id) => {
      this.course(course).social_ids = [...this.course(course).social_ids, social_id];
    }

    this.removeFollower = (course, social_id) => this.course(course).social_ids =  _.without(this.course(course).social_ids, social_id);

  });
