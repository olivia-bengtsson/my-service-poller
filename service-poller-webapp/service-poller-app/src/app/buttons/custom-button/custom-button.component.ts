import {Attribute, Component, ContentChild, HostBinding, Input} from '@angular/core';
import {CustomButtonLoaderIconDirective} from "../custom-button-loader-icon.directive";

@Component({
  selector:  "button[customButton]",
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {

  @HostBinding("class.loading")
  @HostBinding("attr.aria-disabled")
  @Input()
  loading = false;

  @HostBinding("class")
  get classes(): string {
    return this.variant || "primary";
  }

  @ContentChild(CustomButtonLoaderIconDirective)
  icon!: CustomButtonLoaderIconDirective;

  constructor(@Attribute("variant")
              private variant: "primary") { }


}
