import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PixelsComponent } from './pixels.component';
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
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
