import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { SplitScreenSkewedComponent } from './split-screen-skewed.component';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

@NgModule({
  imports: [
    CommonModule, BusinessCardModule,
    FormsModule, RouterModule
  ],
  exports: [ SplitScreenSkewedComponent ],
  declarations: [ SplitScreenSkewedComponent ]
})
export class SplitScreenModule {}
