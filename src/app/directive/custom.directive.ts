import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {

  constructor(public view: TemplateRef<any>) {

  }

}
