import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ParallaxCSSComponent } from './scroll-parallax/parallax-css.component';
import { RouterModule } from '@angular/router';
import { MouseParallaxComponent } from './mouse-parallax/mouse-parallax.component';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, BusinessCardModule,
    RouterModule.forRoot([
      {
        path: 'parallax-scroll',
        component: ParallaxCSSComponent
      },
      {
        path: 'parallax-mouse',
        component: MouseParallaxComponent
      }
    ])
  ],
  exports: [ ParallaxCSSComponent, MouseParallaxComponent ],
  declarations: [ ParallaxCSSComponent, MouseParallaxComponent ]
})
export class ParallaxModule {}
