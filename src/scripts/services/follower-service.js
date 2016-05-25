
angular
  .module('classroom')
  .service('Followers', function () {

    this.followUps = {};

    this.setFollowUps = (followers) => {
      return this.followUps = followers;
    };

    this.isFollowing = (course, social_id) => {
      return _.includes(this.courseFollowers(course), social_id);
    };

    this.courseFollowers = (course) => {
      this.followUps[course] = this.followUps[course] || {social_ids: []};
      return this.followUps[course].social_ids;
    };

    this.count = (course) => this.courseFollowers(course).length;

    this.addFollower = (course, social_id) => {
      this.courseFollowers(course).push(social_id);
    };

    this.removeFollower = (course, social_id) => {
      _.pull(this.courseFollowers(course), social_id);
    };
});
