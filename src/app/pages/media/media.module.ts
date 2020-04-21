import { NgModule } from '@angular/core';

import { SoundWavesModule } from './sound-waves/sound-waves.module';
import { SynthesizerModule } from './synthesizer/synthesizer.module';
import { Gn8PlayerModule } from './gn8-player/gn8-player.module';
import { DecibelMeterComponent } from './decibel-meter/decibel-meter.component';

@NgModule({
  imports: [
   
    SoundWavesModule,
    SynthesizerModule,
    Gn8PlayerModule,

  ],
  exports: [ DecibelMeterComponent ],
  declarations: [ DecibelMeterComponent ]
})
export class MediaModule {}
