import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PollerComponent} from './poller/poller.component';
import {AgGridModule} from 'ag-grid-angular';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ServiceDialogComponent} from './service-dialog/service-dialog.component';
import {CustomButtonsModule} from "./buttons/custom-buttons/custom-buttons.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    PollerComponent,
    ServiceDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    CustomButtonsModule,
    NgbModule,
    MatSnackBarModule
  ],
  entryComponents: [
    PollerComponent,
    ServiceDialogComponent
  ],
  providers: [
    PollerComponent,
    ServiceDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
