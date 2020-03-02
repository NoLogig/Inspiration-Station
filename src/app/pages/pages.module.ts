import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BusinessCardModule } from '../services/business-card/business-card.module';
import { ChartsDataModule } from './charts/charts.module';
import { GamesModule } from './games/games.module';
import { MapModule } from './API/google-maps/maps.module';
import { MathModule } from './math/math.module';
import { MediaModule } from './media/media.module';
import { PEILModule } from './PEIL/peil.module';
import { PixelsModule } from './pixels/pixels.module';

import { EnigmaComponent } from './games/enigma/enigma.component';
import { GithubViewerComponent } from './API/github-viewer/github-viewer.component';
import { HarmonyComponent } from './harmony/harmony.component';

@NgModule({
  declarations: [
    EnigmaComponent, GithubViewerComponent, HarmonyComponent
  ],
  exports: [
    EnigmaComponent, GithubViewerComponent
  ],
  imports: [
    CommonModule,

    BusinessCardModule, ChartsDataModule, GamesModule,
    MathModule, MapModule, MediaModule, 
    PEILModule, PixelsModule,

    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatDividerModule, MatListModule, MatButtonModule,
    MatCardModule, MatSliderModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatTabsModule
  ]
})
export class PagesModule { }
