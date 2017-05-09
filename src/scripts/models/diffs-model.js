
angular
  .module('classroom')
  .factory('Diffs', function (Submission) {

    const fromSubmission = (value, i, array) => {
      return {
        id: i,
        left: Submission.from(array[i - 1]),
        right: Submission.from(value)
      };
    };

    class Diffs {

      constructor(submissions = []) {
        this._diffs = submissions.map(fromSubmission);

        this._MIN = 0;
        this._MAX = this._diffs.length - 1;

        this.pages = 5;

        this.selectLast();
      }

      get length() {
        return this._diffs.length;
      }

      get(index) {
        return this._diffs[index];
      }

      indexOf(diff) {
        return _.findIndex(this._diffs, ['id', _.get(diff, 'id')]);
      }

      selectedIndex() {
        return this.indexOf(this.selected);
      }

      isEmpty() {
        return this.length === 0;
      }

      isSelected(diff) {
        return _.get(diff, 'id') === _.get(this.selected, 'id');
      }

      selectLast() {
        this.selected = this.last();
      }

      last() {
        return this._diffs[this._MAX];
      }

      static from(submissions) {
        return new Diffs(submissions);
      }

    }

    return Diffs;

  })
