
angular
  .module('classroom')
  .service('Notification', function () {
    this.notifications = [];

    this.set = (notifications) => {
      this.notifications = notifications;
    };

    this.hasNotifications = () => {
      console.log(this.notifications);
      return _.isEmpty(this.notifications);
    };
    
    this.count = () => this.notifications.length;

    this.get = () => this.notifications;


  });
