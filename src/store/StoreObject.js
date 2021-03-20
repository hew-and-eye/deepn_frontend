import set from "lodash.set";
export default class StoreObject {
  constructor(initialValue) {
    this.origin = initialValue;
    this._updateValue(initialValue);
    this.commits = [];
    this.index = 0;
  }
  addCommit(commit) {
    this.commits.push(commit);
    this.index++;
    Object.entries(commit).forEach(([k, v]) => {
      this.diffObject = set(this.diffObject || {}, k, v);
    });
    this._updateValue();
    return this;
  }
  _updateValue() {
    this.head = Object.assign(this.origin || {}, this.diffObject);
    return this;
  }
  rollBack(indexDecrement = 1) {
    this.index -= indexDecrement;
    this.diffObject = this.commits.reduce((acc, commit, index) => {
      if (index <= this.index) {
        acc = Object.assign(acc, commit);
      }
    }, {});
    this._updateValue();
    return this;
  }
  get value() {
    return this.head;
  }
}
