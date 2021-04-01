import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appAnswerBackground]',
})
export class AnswerBackgroundDirective {
  @Input() correctAnswer: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onAnswer() {
    if (this.correctAnswer) {
      this.renderer.setStyle(
        this.elRef.nativeElement,
        'background-color',
        '#7FFFD4'
      );
    } else {
      this.renderer.setStyle(
        this.elRef.nativeElement,
        'background-color',
        '#DC143C'
      );
    }
  }
}
