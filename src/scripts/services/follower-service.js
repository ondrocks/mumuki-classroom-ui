
angular
  .module('classroom')
  .service('Followers', function () {

    this.followUps = {};

    this.setFollowUps = (followers) => {
      return this.followUps = followers;
    };

    this.isFollowing = (course, uid) => {
      return _.includes(this.courseFollowers(course), uid);
    };

    this.courseFollowers = (course) => {
      this.followUps[course] = this.followUps[course] || {uids: []};
      return this.followUps[course].uids;
    };

    this.count = (course) => this.courseFollowers(course).length;

    this.addFollower = (course, uid) => {
      this.courseFollowers(course).push(uid);
    };

    this.removeFollower = (course, uid) => {
      _.pull(this.courseFollowers(course), uid);
    };
});
