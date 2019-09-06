import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import { MatCardModule, MatSliderModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { GoldenRatioComponent } from './golden-ratio.component';
import { GoldenRectComponent } from './golden-rect/golden-rect.component';

@NgModule({
  declarations: [
    GoldenRatioComponent, GoldenRectComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'golden',
        component: GoldenRatioComponent
      }
    ]),

    BusinessCardModule,

    MatCardModule, MatSliderModule, MatInputModule, MatFormFieldModule,
  ]
})
export class GoldenModule {}
