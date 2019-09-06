import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimersRoutingModule } from './timers-routing.module';
import { MainComponent } from './main/main.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CanvasOptimizedComponent } from './canvas-optimized/canvas-optimized.component';
import { MatButtonModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    
    TimersRoutingModule
  ],
  declarations: [MainComponent, CanvasComponent, CanvasOptimizedComponent]
})
export class TimersModule { }
