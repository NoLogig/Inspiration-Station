import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import { ParallaxMouseJSComponent } from './mouse-parallax/parallax-mouse.component';
import { ParallaxScrollCSSComponent } from './scroll-parallax/parallax-scroll.component';
import { ScrollParallaxJsComponent } from './scroll-parallax-js/scroll-parallax-js.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, BusinessCardModule,
    RouterModule.forRoot([
      {
        path: 'parallax-scroll',
        component: ParallaxScrollCSSComponent
      },
      {
        path: 'parallax-mouse',
        component: ParallaxMouseJSComponent
      },
      {
        path: 'parallax-mouse-js',
        component: ScrollParallaxJsComponent
      }
    ])
  ],
  exports: [ ParallaxScrollCSSComponent, ParallaxMouseJSComponent ],
  declarations: [ ParallaxScrollCSSComponent, ParallaxMouseJSComponent, ScrollParallaxJsComponent ]
})
export class ParallaxModule {}
