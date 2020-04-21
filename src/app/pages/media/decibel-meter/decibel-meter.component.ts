import { Component, 
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
 } from '@angular/core';

@Component({
  selector: 'nlg-decibel-meter',
  templateUrl: './decibel-meter.component.html',
  styleUrls: ['./decibel-meter.component.scss']
})
export class DecibelMeterComponent implements OnInit, AfterContentChecked, AfterContentInit, 
AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {


  constructor() { }


  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {
    console.log('DecibelMeterComponent ngAfterViewChecked');
    // this.initCanvasBase();
    // this.initMultimedia();
    this.initAudioContext();
  }
  ngAfterViewChecked(): void {    console.log('DecibelMeterComponent ngAfterViewChecked'); }
  ngAfterContentChecked(): void { console.log('DecibelMeterComponent ngAfterContentChecked'); }
  ngAfterContentInit(): void {    console.log('DecibelMeterComponent ngAfterContentInit'); }
  ngAfterViewInit(): void {       console.log('DecibelMeterComponent ngAfterViewInit'); }
  ngOnChanges(): void {           console.log('DecibelMeterComponent ngOnChanges'); }
  ngOnDestroy(): void {           console.log('DecibelMeterComponent ngOnDestroy'); }



  /* ########################### */
  /* ####   Audio Context   #### */
  /* ########################### */

  initAudioContext() {

    let setup = {};  // IAudioCtxSetup

    let audioCtx = new AudioContext,
        analyser = audioCtx.createAnalyser();

    analyser.fftSize = 2048;

    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    return setup;

  }

  drawDecibelMeter(ctx, dataArray, analyser, bufferLength) {

    // let drawVisual = requestAnimationFrame(this.draw);
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let sliceWidth = ctx.canvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * ctx.canvas.height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.stroke();

  }

  decibelMeter() {

    let ctx = new AudioContext(),

        url = './assets/souds/Tessellate_Alt-J.mp3',
        audio = new Audio(url),

        // 2048 sample buffer, 1 channel in, 1 channel out  
        processor = ctx.createScriptProcessor(2048, 1, 1),
        
        meter = document.querySelector('.decibelMeter') as HTMLDivElement,
        source;

    audio.crossOrigin = 'anonymous'

    audio.addEventListener('canplaythrough', function () {
      source = ctx.createMediaElementSource(audio)
      source.connect(processor)
      source.connect(ctx.destination)
      processor.connect(ctx.destination)
      audio.play()
    }, false);

    // loop through PCM data and calculate average
    // volume for a given 2048 sample buffer
    processor.onaudioprocess = function (evt) {
      let input = evt.inputBuffer.getChannelData(0),
        len = input.length,
        total = 0,
        i = 0,
        rms;
      while (i < len) total += Math.abs(input[i++])
      rms = Math.sqrt(total / len)
      // if (rms > 0.30) audio.volume -= 0.3;
      meter.innerText = rms;
      meter.style.width = (rms * 100) + '%'
    }

  }


}
