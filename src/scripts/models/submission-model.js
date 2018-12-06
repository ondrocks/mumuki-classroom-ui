
angular
  .module('classroom')
  .factory('Submission', function (Auth, Humanizer, WithMultifileSupport) {

    class Submission {

      constructor(submission = {}) {
        _.assign(this, WithMultifileSupport);

        submission.content = submission.content || '';
        submission.messages = submission.messages || [];

        if (submission.status === 'errored') submission.status = 'failed';

        _.defaults(this, submission);

        this.restartMessage();
      }

      colorClass() {
        switch (this.status) {
          case 'passed':                 return 'success';
          case 'passed_with_warnings':   return 'warning';
          case 'failed': case 'errored': return 'danger';
          default:                       return 'default';
        }
      }

      restartMessage() {
        this.message = '';
        this.messageType = 'success';
      }

      addMessage(message) {
        this.messages.push({
          content: message,
          created_at: new Date(),
          sender: Auth.profile().email
        });
      }

      timeFromNow() {
        return Humanizer.date(this.created_at);
      }

      date() {
        return this.created_at;
      }

      static from(submission) {
        return new Submission(submission);
      }

    }

    return Submission;

  })
