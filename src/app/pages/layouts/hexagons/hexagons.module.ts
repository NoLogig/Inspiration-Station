import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatTabsModule, MatCardModule, MatDividerModule, MatSliderModule } from '@angular/material';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import { HexagonsComponent } from './hexagons.component';
import { HexBorderArrowComponent } from './hex-border-arrow/hex-border-arrow.component';
import { HexRotateComponent } from './hex-rotate/hex-rotate.component';
import { HexLinearGradientComponent } from './hex-linear-gradient/hex-linear-gradient.component';
import { HexScewedComponent } from './hex-scewed/hex-scewed.component';
import { HexSvgComponent } from './hex-svg/hex-svg.component';
import { HexTransformComponent } from './hex-transform/hex-transform.component';
import { HexUniCodeComponent } from './hex-uni-code/hex-uni-code.component';
import { CommonModule } from '@angular/common';
import { HexSpinComponent } from './hex-spin/hex-spin.component';
import { HexBorderArrowImgComponent } from './hex-border-arrow-img/hex-border-arrow-img.component';
import { HexRotateImgComponent } from './hex-rotate-img/hex-rotate-img.component';


@NgModule({
  imports: [
    FormsModule, CommonModule,
    BusinessCardModule,
    MatTabsModule, MatCardModule, MatDividerModule, MatSliderModule,
    RouterModule.forRoot([
      {
        path: 'hexagon',
        component: HexagonsComponent
      }
    ])
  ],
  exports: [],
  declarations: [
    HexBorderArrowImgComponent, HexRotateImgComponent,
    HexagonsComponent, HexSpinComponent, HexBorderArrowComponent, HexLinearGradientComponent, HexRotateComponent,
    HexScewedComponent, HexSvgComponent, HexTransformComponent, HexUniCodeComponent,
  ]
})
export class HexagonsModule { }
