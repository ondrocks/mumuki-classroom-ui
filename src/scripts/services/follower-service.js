
angular
  .module('classroom')
  .service('Followers', function (Api, Auth) {

    this.followers = {};

    this.setFollowers = (followers) => {
      return this.followers = followers;
    }

    this.isFollowing = (course, social_id) => {
      this.followers[course] = this.followers[course] || {};
      return this.courseFollowers(course).length !== 0 && _.includes(this.course(course).social_ids, social_id);
    }

    this.courseFollowers = (course) => this.followers[course];

    this.course = (course) => _.head(this.courseFollowers(course))

    this.addFollower = (course, social_id) => {
      this.course(course).social_ids = [...this.course(course).social_ids, social_id];
    }

    this.removeFollower = (course, social_id) => this.course(course).social_ids =  _.without(this.course(course).social_ids, social_id);

  });
