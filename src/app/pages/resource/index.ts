import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from './resource.service';
import { HttpClientModule } from '@angular/common/http';
import { ResourceStoreService } from './resource.store';
import { ApiUrl } from './api-url-injection-token';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: []
})
export class ResourceModule {

  static forRoot(apiUrl: string) {

    return {
      ngModule: ResourceModule,
      providers: [
        { provide: ApiUrl, useValue: apiUrl },
        ResourceService,
        ResourceStoreService
      ]
    };
    
  }

}
