import {Component, Input, OnInit, Output} from '@angular/core';
import {ServiceModel} from '../models/service-model';
import {ServiceDialogComponent} from "../service-dialog/service-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PollerService} from "../services/poller-service";
import {NotificationService} from "../services/notification-service";

@Component({
  selector: 'app-poller',
  templateUrl: './poller.component.html',
  styleUrls: ['./poller.component.scss']
})


export class PollerComponent implements OnInit {

  @Input() services!: ServiceModel[]
  @Output() title = ''

  service!: ServiceModel
  loadingDelete!: string
  loadingUpdate!: string
  name: string = '';


  constructor(private pollerService: PollerService,
              private notificationService: NotificationService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  async updateConnection(serviceId: string) {
    try {
      this.loadingUpdate = serviceId
      await this.pollerService.updateConnection(serviceId).then((service) => {
        const index = this.services.findIndex(service => service.id === serviceId)
        this.services[index] = service
      })
    } catch (error) {
      this.notificationService.showError('Something went wrong when updating the service. Try to reload the page.')
    } finally {
      this.loadingUpdate = ''
    }
  }


  delete(serviceId: string) {
    this.loadingDelete = serviceId
    this.pollerService.delete(serviceId).then(r => {
      this.services = this.services.filter(service => service.id !== serviceId)
    }).catch(() => this.notificationService.showError('Something went wrong. Was not able to delete the service.')).finally(() => {
      this.loadingUpdate = ''
    })
  }

  openDialog(serviceModel?: ServiceModel): void {
    const dialogRef = this.matDialog.open(ServiceDialogComponent, {
      width: '500px',
      height: '400px',
      data: {name: serviceModel?.name, url: serviceModel?.url, id: serviceModel?.id}
    });

    dialogRef.afterClosed().subscribe((service) => {
      if (serviceModel) {
        this.title = 'Edit Service'
        this.pollerService.edit(serviceModel.id, service.name, service.url).then((service) => {
          const index = this.services.findIndex(service => service.id === serviceModel.id)
          this.services[index] = service
        })
      } else {
        this.title = 'Add Service'
        this.pollerService.create(service.name, service.url).then((service) => {
          this.services.push(service)
        }).catch(() =>
          this.notificationService.showError('Something went wrong. Was not able to add the service.')
        )
      }

    });
  }

}
