import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PEILComponent } from './peil.component';
import { MatTabsModule } from "@angular/material";

@NgModule({
  imports: [
    MatTabsModule,
    
    RouterModule.forRoot([
      {
        path: 'peil',
        component: PEILComponent
      }
    ])
  ],
  exports: [ PEILComponent],
  declarations: [
    PEILComponent
  ]
})
export class PEILModule { }
