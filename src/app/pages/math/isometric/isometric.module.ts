import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IsometricComponent } from './isometric.component';
import { BusinessCardModule } from 'src/app/services/business-card/business-card.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({

  declarations: [
    IsometricComponent
  ],
  exports: [
  ],
  imports: [
    BusinessCardModule,

    MatButtonModule,
    
    RouterModule.forRoot([
      {
        path: 'isometric',
        component: IsometricComponent
      }
    ])
  ]
})
export class IsometricModule { }
