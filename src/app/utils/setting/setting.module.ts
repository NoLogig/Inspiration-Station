import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SettingComponent } from './setting.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    FormsModule, CommonModule, MatCardModule, 
    MatCheckboxModule, MatAutocompleteModule, MatInputModule, MatAutocompleteModule, MatButtonToggleModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatDividerModule, MatListModule, MatButtonModule,
    MatCardModule, MatSliderModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatTabsModule, MatRadioModule
  ],
  exports: [SettingComponent],
  declarations: [
    SettingComponent
  ]
})
export class SettingModule { }
