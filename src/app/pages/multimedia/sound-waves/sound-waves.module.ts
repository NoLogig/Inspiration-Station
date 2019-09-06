import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule,
  MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
  MatSliderModule, MatTabsModule, MatFormFieldModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SoundWavesComponent } from './sound-waves.component';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

@NgModule({
  imports: [
    CommonModule,

    MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule,
    MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSelectModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
    MatSliderModule, MatTabsModule,
    FormsModule, BusinessCardModule,
    RouterModule.forRoot([
      {
        path: 'soundwaves',
        component: SoundWavesComponent
      }
    ])
  ],
  exports: [ SoundWavesComponent ],
  declarations: [
    SoundWavesComponent
  ]
})
export class SoundWavesModule { }
