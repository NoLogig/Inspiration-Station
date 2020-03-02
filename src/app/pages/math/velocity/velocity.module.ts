import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VelocityComponent } from './velocity.component';
import { BusinessCardModule } from 'src/app/services/business-card/business-card.module';

@NgModule({

  declarations: [
    VelocityComponent
  ],
  exports: [
  ],
  imports: [
    BusinessCardModule,
    RouterModule.forRoot([
      {
        path: 'velocity',
        component: VelocityComponent
      }
    ])
  ]
})
export class VelocityModule { }
