
angular
  .module('classroom')
  .factory('Submission', function (Auth, Humanizer) {

    class Submission {

      constructor(submission = {}) {
        submission.content = submission.content || '';
        submission.comments = submission.comments || [];

        _.defaults(this, submission);

        this.restartComment();
      }

      colorClass() {
        switch (this.status) {
          case 'passed':                 return 'success';
          case 'passed_with_warnings':   return 'warning';
          case 'failed': case 'errored': return 'danger';
          default:                       return 'default';
        }
      }

      restartComment() {
        this.comment = '';
        this.commentType = 'success';
      }

      addComment(comment, commentType) {
        this.comments.push({
          content: comment,
          type: commentType,
          date: new Date(),
          email: Auth.profile().email
        });
      }

      timeFromNow() {
        return Humanizer.date(this.created_at);
      }

      static from(submission) {
        return new Submission(submission);
      }

    }

    return Submission;

  })
