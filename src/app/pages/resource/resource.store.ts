import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IResource} from './resource';

@Injectable()
export class ResourceStoreService {

  /** Store for resources.
   * For example, the store could have such a resource:
   * resourceStore['heroes']['412'] returns BehaviorSubject with .getValue() == {id: '412', name: 'Wolverine'}
   */
  private resourceStore: ResourceStore = {};

  // Precondition: resource.uid needs to exist
  addOrUpdate (resourceName: string, resource: IResource): void {

    // Initialization if not yet initialized already;
    this.resourceStore[resourceName] = this.resourceStore[resourceName] || {};

    if (this.resourceStore[resourceName][resource.uid]) {
      // push next if already initialized
      this.resourceStore[resourceName][resource.uid].next(resource);
      return;
    }
    
    // more initialization logic
    this.resourceStore[resourceName][resource.uid] = new BehaviorSubject(resource)
  }

  addOrUpdateMany (resourceName: string, resources: IResource[]): void {

    resources.forEach(resource => this.addOrUpdate(resourceName, resource));
  }

  remove (resourceName: string, resourceId: string): void {

    this.resourceStore[resourceName][resourceId].complete();
  }

  get (resourceName: string, resourceId: string): BehaviorSubject<IResource> {

    return this.resourceStore[resourceName][resourceId];
  }

}

interface ResourceStore {
  
  [resourceName: string]: {
    [resourceId: string]: BehaviorSubject<IResource>
  };
}
