import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  private backgroundColor!: string;

  @HostListener('mouseenter') onMouseOver() {
    /*this._renderer.setStyle(
      this._elementRef.nativeElement,
      'background-color', 'yellow');*/
      this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    /*this._renderer.setStyle(
      this._elementRef.nativeElement,
      'background-color', 'white');*/
      this.backgroundColor = 'white';
  }

  // Implícito
  //@HostBinding('style.backgroundColor') backgroundColor!: string;

  // Explícito
  @HostBinding('style.backgroundColor') get setColor() {
    return this.backgroundColor;
  }

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) { }

}
