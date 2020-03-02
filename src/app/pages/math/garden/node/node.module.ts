import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BusinessCardModule } from 'src/app/services/business-card/business-card.module';

import { NodeGardenComponent } from './node.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'node-garden',
        component: NodeGardenComponent
      }
    ]),

    BusinessCardModule
  ],
  exports: [ NodeGardenComponent ],
  declarations: [ NodeGardenComponent ]
})
export class NodeGardenModule {}
