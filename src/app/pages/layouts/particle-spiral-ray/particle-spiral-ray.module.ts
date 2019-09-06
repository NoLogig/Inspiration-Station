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
import { ParticleSpiralRayComponent } from './particle-spiral-ray.component';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

@NgModule({
  imports: [
    CommonModule, BusinessCardModule,

    MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule,
    MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSelectModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
    MatSliderModule, MatTabsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'particle-spiral-ray',
        component: ParticleSpiralRayComponent
      }
    ])
  ],
  exports: [ ParticleSpiralRayComponent ],
  declarations: [
    ParticleSpiralRayComponent
  ]
})
export class ParticleSpiralRayModule { }
