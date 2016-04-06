
angular
  .module('classroom')
  .service('Followers', function (Api, Auth) {

  	this.followers = [];

  	this.setFollowers = (followers) => this.followers = followers;

    this.doFollow = (social_id) =>_.includes(this.followers, social_id);

    this.addFollower = (social_id) => this.followers = [...this.followers, social_id];

    this.removeFollower = (social_id) => this.followers =  _.without(this.followers, social_id);

  });
