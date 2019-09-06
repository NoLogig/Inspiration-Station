import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PixelsComponent } from './pixels.component';
import { MatTabsModule, MatDividerModule } from "@angular/material";
import { ImageEditorComponent } from './img-editor/img-editor.component';
import { VideoEditorComponent } from './video-editor/video-editor.component';

@NgModule({
  imports: [
    MatTabsModule, MatDividerModule,

    RouterModule.forRoot([
      {
        path: 'pixels',
        component: PixelsComponent
      }
    ])
  ],
  exports: [PixelsComponent, ImageEditorComponent, VideoEditorComponent ],
  declarations: [
    PixelsComponent, ImageEditorComponent, VideoEditorComponent
  ]
})
export class PixelsModule { }
