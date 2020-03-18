/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input, Injectable } from '@angular/core';
@Directive({
  selector: '[nlgActive]'
})
export class ActiveDirective {

  @Input() defaultColor: string;
  @Input('nlgActive') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'cyan');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  constructor(private el: ElementRef) { }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}