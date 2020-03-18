import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { BusinessCardComponent } from './business-card.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    FormsModule, CommonModule, MatCardModule
  ],
  exports: [BusinessCardComponent],
  declarations: [
    BusinessCardComponent
  ]
})
export class BusinessCardModule { }
