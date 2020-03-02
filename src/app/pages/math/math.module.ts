import { NgModule } from '@angular/core';

import { BusinessCardModule } from 'src/app/services/business-card/business-card.module';
import { DropNodesModule } from './garden/drop/drop.module';
import { GoldenModule } from './theorems/golden-ratio/golden-ratio.module';
import { TheoremsModule } from './theorems/theorems.module';
import { VelocityModule } from './velocity/velocity.module';
import { IsometricModule } from './isometric/isometric.module';
import { NodeGardenModule } from './garden/node/node.module';
import { PISModule } from './pis/pis.module';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    PISModule,
    BusinessCardModule,
    DropNodesModule,
    GoldenModule, IsometricModule,
    NodeGardenModule,
    TheoremsModule,
    VelocityModule
  ]
})
export class MathModule { }
