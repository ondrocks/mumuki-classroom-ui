
angular
  .module('classroom')
  .service('Notification', function () {
    this.notifications = [];

    this.set = (notifications) => {
      this.notifications = notifications;
    };

    this.hasNotifications = () => !_.isEmpty(this.notifications);

    this.remove = (id) => _.remove(this.notifications, {id: id});

    this.count = () => this.notifications.length;

    this.get = () => this.notifications;

    this.hasNotificationsBy = (filter = {}) => _.some(this.notifications, filter);


  });
