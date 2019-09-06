import { NgModule } from '@angular/core';

import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';
import { DropNodesModule } from './garden/drop/drop.module';
import { GoldenModule } from './theorems/golden-ratio/golden-ratio.module';
import { TheoremsModule } from './theorems/theorems.module';
import { VelocityModule } from './velocity/velocity.module';
import { IsometricModule } from './isometric/isometric.module';
import { NodeGardenModule } from './garden/node/node.module';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    BusinessCardModule,
    DropNodesModule,
    GoldenModule, IsometricModule,
    NodeGardenModule,
    TheoremsModule,
    VelocityModule
  ]
})
export class MathModule { }
