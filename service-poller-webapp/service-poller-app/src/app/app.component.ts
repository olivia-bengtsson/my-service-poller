import {Component, OnInit} from '@angular/core';
import {ServiceModel} from "./models/service-model";
import {PollerService} from "./services/poller-service";
import {NotificationService} from "./services/notification-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'service-poller-app';
  services: ServiceModel[] = []

  constructor(private pollerService: PollerService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getAllServices()
  }

  getAllServices() {
    this.pollerService.findAllServices().then((services) => {
      this.services = services
    }).catch(() => this.notificationService.showError('No connection with the server.'))
  }
}
