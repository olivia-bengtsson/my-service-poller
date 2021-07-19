import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceModel} from "../models/service-model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss'],

})
export class ServiceDialogComponent implements OnInit {

  serviceForm!: FormGroup
  URL_REGEXP = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
  title: string = 'Add Service'

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ServiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ServiceModel) {
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.title = 'Edit Service'
    }
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(this.URL_REGEXP)]]
    })

    if (this.data) {
      this.serviceForm.patchValue(this.data)
    }
  }

  onSubmit(): void {
    this.dialogRef.close(this.serviceForm.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

