import { Component, OnInit } from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system/file-system.service';

@Component({
  selector: 'nlg-harmony',
  templateUrl: './harmony.component.html',
  styleUrls: ['./harmony.component.scss'],
  providers: [FileSystemService]
})
export class HarmonyComponent implements OnInit {

  constructor(public file_system: FileSystemService) {  }

  ngOnInit() { }

  fileSystem() {
    this.file_system.openPicker();
  }

  getFile() {
    this.file_system.file(this.file_system.file_ref);
  }

  getFiles() {
    this.file_system.files(this.file_system.file_refs);
  }

  getDir() {
    this.file_system.directory(this.file_system.dir_ref);
  }

  getDirs() {
    this.file_system.directories(this.file_system.dir_refs);
  }

}
