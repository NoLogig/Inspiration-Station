import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import { MatTabsModule, MatCardModule, MatDividerModule, MatSliderModule } from '@angular/material';

import { HexagonsComponent } from './hexagons.component';
import { HexBorderArrowComponent } from './hex-border-arrow/hex-border-arrow.component';
import { HexBorderArrowImgComponent } from './hex-border-arrow-img/hex-border-arrow-img.component';
import { HexGradientComponent } from './hex-gradient/hex-gradient.component';
import { HexRotateComponent } from './hex-rotate/hex-rotate.component';
import { HexRotateImgComponent } from './hex-rotate-img/hex-rotate-img.component';
import { HexSkewedComponent } from './hex-skewed/hex-skewed.component';
import { HexSpinComponent } from './hex-spin/hex-spin.component';
import { HexSvgComponent } from './hex-svg/hex-svg.component';
import { HexTransformComponent } from './hex-transform/hex-transform.component';
import { HexUniCodeComponent } from './hex-uni-code/hex-uni-code.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
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
    HexagonsComponent,
    HexBorderArrowComponent, HexBorderArrowImgComponent, HexGradientComponent, HexRotateComponent, HexRotateImgComponent,
    HexSkewedComponent, HexSpinComponent, HexSvgComponent, HexTransformComponent, HexUniCodeComponent
  ]
})
export class HexagonsModule { }
