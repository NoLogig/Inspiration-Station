import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/share';
// import 'rxjs/add/operator/catch';

import { IResource } from './resource';
import { ApiUrl } from './api-url-injection-token';
import { WebUtils } from '@tsmean/utils';

@Injectable()
export class ResourceService {

  constructor( @Inject(ApiUrl) private apiUrl: string, private http: HttpClient ) { }

  /** Url to web api, appended with resource name
   * yields e.g http://localhoast:4300/api/v1/ + resourceName
   */
  private resourcesUrl(resourceName: string) {

    return WebUtils.urlJoin(
      this.apiUrl,
      resourceName);
  }

  // getResources(resourceName: string): Observable<IResource[]> {

  //   const $data = this.http.get(this.resourcesUrl(resourceName))
  //     .map(resp => resp.json().data).share();
  //   return $data.catch(this.handleError);
  // }

  // getResource(resourceId: string, resourceName: string): Observable<IResource> {

  //   const $data = this.http.get(WebUtils.urlJoin(this.resourcesUrl(resourceName), resourceId)).
  //     .map(resp => resp.json().data).share();
  //   return $data.catch(this.handleError);
  // }

  // createResource(newResource: IResource, resourceName: string): Observable<IResource> {

  //   const $data = this.http.post(this.resourcesUrl(resourceName), newResource)
  //     .map(resp => resp.json().data).share();
  //   return $data.catch(this.handleError);
  // }

  // updateResource(resource: IResource, resourceName: string): Observable<IResource> {

  //   const $data = this.http.put(this.resourcesUrl(resourceName), resource)
  //     .map(resp => resp.json().data).share();
  //   return $data.catch(this.handleError);
  // }

  // deleteResource(resourceId: string, resourceName: string): Observable<IResource> {

  //   const $data = this.http.delete(WebUtils.urlJoin(this.resourcesUrl(resourceName), resourceId))
  //     .map(resp => resp.json().data).share();
  //   return $data.catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
