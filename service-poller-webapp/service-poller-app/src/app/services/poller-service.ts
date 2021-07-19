import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ServiceModel} from '../models/service-model'

@Injectable({
  providedIn: 'root'
})
export class PollerService {

  BASE_URL = 'http://localhost:8080/api/servicepoller'

  constructor(private http: HttpClient) {
  }

  findAllServices(): Promise<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(this.BASE_URL).toPromise()
  }

  create(name: string, url: string): Promise<ServiceModel> {
    const request = {
      name,
      url
    }
    return this.http.post<ServiceModel>(this.BASE_URL, request).toPromise()
  }

  delete(serviceId: string) {
    return this.http.delete(this.BASE_URL + '/' + serviceId).toPromise()
  }

  edit(serviceId: string, name: string, url: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(this.BASE_URL + '/' + serviceId + '/' + name, url).toPromise()
  }

  updateConnection(serviceId: string): Promise<ServiceModel> {
    return this.http.get<ServiceModel>(this.BASE_URL + '/' + serviceId).toPromise()
  }

}
