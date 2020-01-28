import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatDividerModule, MatCardModule, MatSliderModule, MatSidenavModule, MatToolbarModule, MatTabsModule, MatListModule, MatButtonModule } from '@angular/material';

import { HomeComponent } from './home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,  
    FormsModule,
    RouterModule,
    
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatDividerModule, MatCardModule, MatSliderModule,
    MatSidenavModule, MatToolbarModule, MatIconModule, MatTabsModule, MatListModule, MatButtonModule
  ],
  exports: [ HomeComponent ],
  declarations: [ ImpressumComponent, HomeComponent, FooterComponent, HeaderComponent ]
})
export class HomeModule { }
