import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';
import { MatCardModule, MatToolbarModule } from "@angular/material";
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, BusinessCardModule,
    MatCardModule, MatToolbarModule,
    // RouterModule.forChild(routes)
    RouterModule.forRoot([
      {
        path: 'maps',
        component: MapsComponent
      }
    ])
  ],
  declarations: [MapsComponent]
})
export class MapModule { }
