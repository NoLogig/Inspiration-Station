import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PISComponent } from './pis.component';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';
import { MatButtonModule } from '@angular/material';

@NgModule({

  declarations: [
    PISComponent
  ],
  exports: [
  ],
  imports: [
    BusinessCardModule,

    MatButtonModule,
    
    RouterModule.forRoot([
      {
        path: 'pis',
        component: PISComponent
      }
    ])
  ]
})
export class PISModule { }
