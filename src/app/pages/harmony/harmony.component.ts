import { Component, OnInit } from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system/file-system.service';

@Component({
  selector: 'nlg-harmony',
  templateUrl: './harmony.component.html',
  styleUrls: ['./harmony.component.scss'],
  providers: [FileSystemService]
})
export class HarmonyComponent implements OnInit {

  constructor(public fs: FileSystemService) {
    
   }

  ngOnInit() { }

  nativeFileSystem() {

    this.fs.fileSystem();

}
getFile() {

    this.fs.fileSystemGetFile();

}
getFiles() {

    this.fs.fileSystemGetFiles();

}

}
