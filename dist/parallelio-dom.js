(function() {
  var DOM;

  DOM = {};

  if (typeof module !== "undefined" && module !== null) {
    module.exports = DOM;
  } else {
    if (this.Parallelio == null) {
      this.Parallelio = {};
    }
    this.Parallelio.DOM = DOM;
  }

}).call(this);
