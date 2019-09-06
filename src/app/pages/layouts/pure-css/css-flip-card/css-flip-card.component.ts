import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-css-flip-card',
  templateUrl: './css-flip-card.component.html',
  styleUrls: ['./css-flip-card.component.css']
})
export class CssFlipCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

// ======================= DOM Utility Functions from PastryKit =============================== //
// Sure, we could use jQuery or XUI for these,
// but these are concise and will work with plain vanilla JS
/*
Element.prototype.hasClassName = function (a) {
  return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};
Element.prototype.addClassName = function (a) {
  if (!this.hasClassName(a)) {
      this.className = [this.className, a].join(" ");
  }
};
Element.prototype.removeClassName = function (b) {
  if (this.hasClassName(b)) {
      var a = this.className;
      this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
  }
};
Element.prototype.toggleClassName = function (a) {
this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};
*/

}
