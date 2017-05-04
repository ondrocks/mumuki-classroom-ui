
angular
  .module('classroom')
  .service('Notification', function () {
    this.notifications = [];

    this.set = (notifications) => {
      this.notifications = notifications;
    };

    this.hasNotifications = () => {
      return !_.isEmpty(this.notifications);
    };

    this.remove = (id) => {
      console.log(1, this.notifications);
      _.remove(this.notifications, {id: id});
      console.log(2, this.notifications);
    };

    this.count = () => this.notifications.length;

    this.get = () => this.notifications;

    this.hasNotificationsBy = (filter = {}) => _.some(this.notifications, filter);


  });
