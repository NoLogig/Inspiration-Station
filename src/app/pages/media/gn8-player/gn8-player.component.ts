import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import maths, { utils } from 'src/app/services/math/math.service';
import { BreakpointObserver } from '@angular/cdk/layout';

export interface IMediaPlayer {
  controls: boolean;
  poster: string;
  src: string;
  loop: boolean;
  autoplay: boolean;
}
export interface IMediaFile extends File {
  url: string;
  saveUrl: SafeUrl;
}
export interface ISetup {
  audioCtx: AudioContext,
  analyser:  AnalyserNode,
  bufferLength: number,
  dataArray:  Uint8Array
};

@Component({
  selector: 'nlg-gn8-player',
  templateUrl: './gn8-player.component.html',
  styleUrls: ['./gn8-player.component.scss']
})
export class Gn8PlayerComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit, OnChanges {

  @ViewChild('player', { static: true }) videoRef: ElementRef;

  metas = {
    title: 'Good N8 Player',
    subTitle: `Like falling asleep during a movie & hate be awakened by extremely loud sounds?
               Most dialogues are too quiet, sound effects drowned out & make watch something as a torture in the middle of the night!`,
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station.git',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/multimedia/gn8-player',
      live: 'https://heroku.apps.com/NoLogig/Inspiration-Station/gn8-player',
    }
  };

  /* ####    File Reader    #### */
  fileReader: HTMLInputElement;
  selectList: IMediaFile[] = [];
  playList = [];

  /* ####       Media       #### */
  videoPlayer: HTMLVideoElement;
  audioPlayer: HTMLAudioElement;
  currentList: IMediaFile[] = [];
  currentMedia: string;

  media = {
    player: HTMLVideoElement,
    controls: true,
    poster: "./assets/img/ethereum-blur.jpg",
    current: {
      index: 0,
      media: {} as IMediaFile
    },
    files: [] as IMediaFile[],
    playLists: [[]] as IMediaFile[][],
  };

  /* ####   Audio Context   #### */
  audioCtx: AudioContext;
  analyser: any;
  bufferLength: number;
  dataArray: Uint8Array;

  setup: ISetup;
  rangeDecibel: number;

  constructor(private rend: Renderer2, private domSanitizer: DomSanitizer, private breakpointObserver: BreakpointObserver) { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */
  
  ngOnInit() {

    console.log('Gn8 Init');

    this.videoPlayer = this.videoRef.nativeElement;
    // this.videoPlayer.width =  window.innerWidth * 0.68;
    // this.rend.listen(this.video, 'load', () => console.log('video load'));
    
    this.videoPlayer.onended = this.autoplayNext;
    // this.initFileReader();
    // this.initMultimedia();
    // this.initAudioContext();
  }
  ngAfterViewChecked() {    console.log('Gn8 ViewChecked'); }
  ngAfterContentChecked() { console.log('Gn8 ContentChecked'); }
  ngAfterContentInit() {    console.log('Gn8 ContentInit'); }
  ngAfterViewInit() {       console.log('Gn8 ViewInit'); }
  ngOnChanges() {           console.log('Gn8 Changes'); }
  ngOnDestroy() {           console.log('Gn8 Destroy'); }

  /* ########################### */
  /* ####    File Reader    #### */
  /* ########################### */

  selectLocalMedias(fileList: FileList): IMediaFile[] {

    let tmpList: IMediaFile[] = [];
    let URL = window.URL;

    if (fileList[0]) {

      for (let i = 0, limit = fileList.length; i < limit; i++) {

        let media = fileList[i] as IMediaFile;
        media.url = URL.createObjectURL(fileList[i]);
        media.saveUrl = this.domSanitizer.bypassSecurityTrustUrl(media.url);

        tmpList.push(media);
      }
      return tmpList;
    }
    
    return;
  }

  select2Paylist(name: string) {
    
    this.playList.push({ name, files: this.selectList });
  }

  files2Playlist(files: IMediaFile[], playList): void {

    if (files[0]) {
      playList.push(files);
    }
  }

  /* ########################### */
  /* ####       Media       #### */
  /* ########################### */

  playRnd() {

    let media = this.selectList[this.rnd(this.selectList)];
    this.currentMedia = media.name;
    this.media.current.media = media;
    this.videoPlayer.src = media.url;
    this.videoPlayer.play();
  }

  setVideoURL(url: SafeUrl, player: HTMLVideoElement): void
  setVideoURL(url: string, player: HTMLVideoElement): void {

    player.src = url;
  }

  scrollVolume(e: WheelEvent): void {

    e.preventDefault();
    // Need to round cuz 0.94 rounding bug that turns value into 0.93999... 
    // Therefore it's impossible to mute the player without rounding here.
    if (e.deltaY < 0 && this.videoPlayer.volume < 1.00) {

      this.videoPlayer.volume = utils.roundToPlaces(this.videoPlayer.volume += 0.01, 3);
      return;
    }
    if (this.videoPlayer.volume >= 0.01) this.videoPlayer.volume = utils.roundToPlaces(this.videoPlayer.volume -= 0.01, 3);
  }

  autoplayNext = () => {

    let i = this.media.current.index + 1;

    if (this.selectList[i].url) {

      this.media.current.index = i;
      this.media.current.media = this.selectList[i];
      this.videoPlayer.src = this.selectList[i].url;
      this.videoPlayer.play();
    }
  }

  /* ########################### */
  /* ####   Audio Context   #### */
  /* ########################### */

  initAudioContext() {

    this.audioCtx = new AudioContext;
    this.analyser = this.audioCtx.createAnalyser();

    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.setup = this.initAudioContextDecibelMeter();

  }

  initAudioContextDecibelMeter() {

    let setup = {
      audioCtx: new AudioContext,
      analyser: {} as AnalyserNode,
      bufferLength: null,
      dataArray: {} as Uint8Array
    };

    setup.analyser = setup.audioCtx.createAnalyser();
    setup.analyser.fftSize = 2048;

    setup.bufferLength = setup.analyser.frequencyBinCount;
    setup.dataArray = new Uint8Array(setup.bufferLength);

    return this.setup = setup;
  }

  decibelMeter(video: HTMLVideoElement, audioCtx: AudioContext, target: HTMLDivElement, url = './assets/sounds/Tessellate_Alt-J.mp3') {

    // let audio = new Audio(url);
    // audio.crossOrigin = 'anonymous';

    // 2048 sample buffer, 1 channel in, 1 channel out  
    let processor = audioCtx.createScriptProcessor(2048, 1, 1);

    let source: MediaElementAudioSourceNode;

    // video.addEventListener('canplaythrough', function () {

      source = audioCtx.createMediaElementSource(video);
      source.connect(processor);
      source.connect(audioCtx.destination);
      processor.connect(audioCtx.destination);
      // video.play()
    // }, false);

    // loop through PCM data and calculate average
    // volume for a given 2048 sample buffer
    processor.onaudioprocess = (evt) => {

      let input = evt.inputBuffer.getChannelData(0),
          len = input.length,
          total = 0,
          i = 0,
          rms;

      while (i < len) total += Math.abs(input[i++]);

      rms = Math.sqrt(total / len);

      if (rms > this.rangeDecibel && video.volume > 0.05) video.volume -= 0.05;
      
      if (rms < this.rangeDecibel && video.volume < 0.995) video.volume += 0.005;
      
      target.style.width = (rms * 100) + '%';
    }

  }

  startDecibelMeter(target: HTMLDivElement) {

    let url = this.media.current.media.url;
    this.decibelMeter(this.videoPlayer, this.setup.audioCtx, target, url);

  }

  /* ########################### */
  /* ####      Helpers      #### */
  /* ########################### */

  rnd(range: number | any[]) {

    if (typeof range === "number") {
      return Math.floor(Math.random() * range);
    }
    return Math.floor(Math.random() * range.length);
  }

  /* ########################### */
  /* ####       Tests       #### */
  /* ########################### */

  test(val: any) {
    console.log('Test - ', val);
  }

}
