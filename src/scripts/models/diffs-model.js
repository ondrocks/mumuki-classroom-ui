
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

      selectPrev() {
        this.selected = this.prev();
      }

      selectNext() {
        this.selected = this.next();
      }

      selectLast() {
        this.selected = this.last();
      }

      selectFirst() {
        this.selected = this.first();
      }

      prev() {
        return this._diffs[Math.max(this.selectedIndex() - 1, this._MIN)];
      }

      next() {
        return this._diffs[Math.min(this.selectedIndex() + 1, this._MAX)];
      }

      last() {
        return this._diffs[this._MAX];
      }

      first() {
        return this._diffs[this._MIN];
      }

      pageStartNumber() {
        const number = _.floor(this.selectedIndex() / this.pages) * this.pages;
        const diffLengthBiggerThanLimit = this.length >= this.pages;
        const numberBiggerThanDiffLength = number + this.pages >= this.length;

        return diffLengthBiggerThanLimit && numberBiggerThanDiffLength ? (this.length - this.pages) : number;
      };

      pageNumber(index) {
        return _.padStart(this.pageStartNumber() + index + 1, 2, '0');
      }

      static from(submissions) {
        return new Diffs(submissions);
      }

    }

    return Diffs;

  })
