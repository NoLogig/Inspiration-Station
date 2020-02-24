import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

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
