import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { ChartsComponent } from './charts.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatToolbarModule, MatSidenavModule, MatRadioModule, MatSliderModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

@NgModule({
  imports: [
    CommonModule, BusinessCardModule,
    ChartsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule,
    MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSelectModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
    MatSliderModule, MatTabsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'charts',
        component: ChartsComponent,
      }
    ])
  ],
  exports: [
    ChartsComponent, ChartBarComponent
  ],
  declarations: [
    ChartsComponent, ChartBarComponent
  ]
})
export class ChartsDataModule { }
