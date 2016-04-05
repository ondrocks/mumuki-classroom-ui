
angular
  .module('classroom')
  .factory('Submission', function (Auth) {

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
          date: Date.now(),
          email: Auth.profile().email
        });
      }

      static from(submission) {
        return new Submission(submission);
      }

    }

    return Submission;

  })
