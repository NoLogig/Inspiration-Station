import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gn8PlayerComponent } from './gn8-player.component';

import {
  MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule,
  MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
  MatSliderModule, MatTabsModule, MatFormFieldModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule,
    MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSelectModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
    MatSliderModule, MatTabsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'gn8-player',
        component: Gn8PlayerComponent
      }
    ])
  ],
  exports: [ Gn8PlayerComponent ],
  declarations: [
    Gn8PlayerComponent
  ]
})
export class Gn8PlayerModule { }
