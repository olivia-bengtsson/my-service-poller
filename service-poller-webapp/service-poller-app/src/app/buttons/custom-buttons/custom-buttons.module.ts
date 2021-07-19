import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomButtonComponent} from "../custom-button/custom-button.component";
import {CustomButtonLoaderIconDirective} from "../custom-button-loader-icon.directive";


@NgModule({
  declarations: [CustomButtonComponent, CustomButtonLoaderIconDirective],
  imports: [CommonModule],
  exports: [CustomButtonComponent, CustomButtonLoaderIconDirective]
})
export class CustomButtonsModule { }

