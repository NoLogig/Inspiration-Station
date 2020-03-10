import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
}

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  /* ####    File Reader    #### */
  fileReader: HTMLInputElement;
  selectList: IMediaFile[] = [];
  playList = [];

  constructor(private domSanitizer: DomSanitizer) {  }

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
  /* ####  Livecycle Hooks  #### */
  /* ########################### */
  
  ngOnInit() {              console.log('FREAD Init'); }
  ngAfterViewChecked() {    console.log('FREAD ViewChecked'); }
  ngAfterContentChecked() { console.log('FREAD ContentChecked'); }
  ngAfterContentInit() {    console.log('FREAD ContentInit'); }
  ngAfterViewInit() {       console.log('FREAD ViewInit'); }
  ngOnChanges() {           console.log('FREAD Changes'); }
  ngOnDestroy() {           console.log('FREAD Destroy'); }

}
