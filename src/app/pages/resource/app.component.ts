import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ResourceService } from './resource.service';

@Component({
  selector: 'res-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class ResourceComponent {

  todos: Array<{}>;

  constructor(private resourceService: ResourceService) {

    // resourceService.getResources('myCollection').subscribe((res) => {

    //   this.todos = res[0].todos || null;
    // });

  }
}


