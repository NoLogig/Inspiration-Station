import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatDividerModule, MatCardModule, MatSliderModule,
  MatSidenavModule, MatToolbarModule, MatIconModule, MatTabsModule, MatListModule, MatButtonModule
} from '@angular/material';

import { BusinessCardModule } from '../utils/business-card/business-card.module';

import { ChartsDataModule } from './charts/chatrs.module';
import { MapModule } from './API/google-maps/maps.module';
import { MathModule } from './math/math.module';
import { MediaModule } from './media/media.module';
import { PixelsModule } from './pixels/pixels.module';
import { PEILModule } from './PEIL/peil.module';

import { EnigmaComponent } from './games/enigma/enigma.component';
import { GithubViewerComponent } from './API/github-viewer/github-viewer.component';
import { GamesModule } from './games/games.module';

@NgModule({
  declarations: [
    EnigmaComponent, GithubViewerComponent
  ],
  exports: [
    EnigmaComponent, GithubViewerComponent
  ],
  imports: [
    CommonModule,

    BusinessCardModule,
    ChartsDataModule,
    GamesModule,
    MediaModule,
    MathModule, MapModule,
    PEILModule,
    PixelsModule,

    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatDividerModule, MatListModule, MatButtonModule,
    MatCardModule, MatSliderModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatTabsModule
  ]
})
export class PagesModule { }
