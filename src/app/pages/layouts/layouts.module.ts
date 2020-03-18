import { NgModule } from '@angular/core';

import { MatSchematicLayoutsModule } from './mat-schematics/layouts.module';
import { ParallaxModule } from './parallax/parallax.module';
import { ParticleSpiralRayModule } from './spiral-ray/spiral-ray.module';
import { SplitScreenModule } from './split-screen-skewed/split-screens.module';
import { HexagonsModule } from './hexagons/hexagons.module';

import { CssCarouselComponent } from './pure-css/css-carousel/css-carousel.component';
import { CssCubeComponent } from './pure-css/css-cube/css-cube.component';
import { CssFlipCardComponent } from './pure-css/css-flip-card/css-flip-card.component';


@NgModule({
  declarations: [
    CssCarouselComponent, CssCubeComponent, CssFlipCardComponent
  ],
  exports: [
    CssCarouselComponent, CssCubeComponent, CssFlipCardComponent
  ],
  imports: [
    SplitScreenModule, ParallaxModule, MatSchematicLayoutsModule, 
    HexagonsModule, ParticleSpiralRayModule
  ]
})
export class LayoutsModule { }
