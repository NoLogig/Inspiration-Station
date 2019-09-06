import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import {
  MatCardModule, MatSliderModule, MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatIconModule, MatButtonToggleModule, MatInputModule
} from '@angular/material';

import { CheckboardComponent } from './color-board/checkboard.component';
import { NumberShazamComponent } from './number-shazam/number-shazam.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,

    BusinessCardModule,

    MatInputModule, MatCardModule, MatSliderModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatButtonToggleModule,
    MatSlideToggleModule,

    RouterModule.forRoot([
      {
        path: 'numberzam',
        component: NumberShazamComponent
      },
      {
        path: 'checkboard',
        component: CheckboardComponent
      }
    ])
  ],
  exports: [ CheckboardComponent, NumberShazamComponent ],
  declarations: [ CheckboardComponent, NumberShazamComponent ]
})
export class GamesModule {}
