import { Component, OnInit } from '@angular/core';
import { IWindow, ChooseFileSystemEntriesOptions } from 'src/app/services/file-system/file-system.service';


@Component({
  selector: 'nlg-harmony',
  templateUrl: './harmony.component.html',
  styleUrls: ['./harmony.component.scss']
})
export class HarmonyComponent implements OnInit {

  exWindow: IWindow = window;

  constructor() { }

  ngOnInit() { }

  async nativeFileSystem() {

    try {

      let fsOptions: ChooseFileSystemEntriesOptions = {};
      fsOptions.accepts = [{
        description: 'Videos',
        extensions: ['mp4', 'ogg']
      }, {
        description: 'Images',
        extensions: ['jpeg', 'jpg', 'png']
      }, {
        description: 'Texts',
        extensions: ['txt', 'json']
      }];
      
      let handle = await this.exWindow.chooseFileSystemEntries({
        accepts: [{ extensions: ['mp4', 'jpeg', 'jpg', 'png', 'txt'] }]
      });

      let file = await handle.getFile();

      console.log(await handle);
      console.log(await file);
      console.log(await file.text());
    }

    catch (e) {

    }

  }

}
