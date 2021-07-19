import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[aidButtonLoader]'
})
export class CustomButtonLoaderIconDirective {

  constructor(public tpl: TemplateRef<any>) { }

}
