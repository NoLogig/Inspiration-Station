import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.css']
})
export class VideoEditorComponent implements OnInit {

   processor = {
    timerCallback: function() {
      if (this.video.paused || this.video.ended) {
        return;
      }
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
        }, 0);
    },

    doLoad: function() {
      this.video = document.getElementById('video');
      this.c1 = document.getElementById('c1');
      this.ctx1 = this.c1.getContext('2d');
      this.c2 = document.getElementById('c2');
      this.ctx2 = this.c2.getContext('2d');
      let self = this;
      this.video.addEventListener('play', function() {
          self.width = self.video.videoWidth / 8;
          self.height = self.video.videoHeight / 8;
          self.timerCallback();
        }, false);
    },

    computeFrame: function() {
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
      let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
      let l = frame.data.length / 4;

      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];

        // Twilight
        if (g > 150 && b > 150 && r > 150) {
          frame.data[i * 4 + 1] = 0;
          frame.data[i * 4 + 2] = 0;
          frame.data[i * 4 + 0] = 0;
        }
      }
      this.ctx2.putImageData(frame, 0, 0);
      return;
    }
  };


  constructor() { }

  ngOnInit() {
    this.processor.doLoad();
  }

}
