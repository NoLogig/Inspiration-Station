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
    this.file_system.getFile(this.file_system.file_ref);
  }

  getFiles() {
    this.file_system.getFiles(this.file_system.file_refs);
  }

  getDir() {
    this.file_system.getDirectory(this.file_system.dir_ref);
  }

  getDirRecursive() {
    this.file_system.getDirectoryRecursive(this.file_system.dir_ref);
  }

  getDirs() {
    this.file_system.getDirectories(this.file_system.dir_refs);
  }

  log(val?: any) {
    this.file_system.log(val);
  }
  t(val?: any) {
    console.log(val);
    // val.style.backgroundColor = 'transparent';
    // val.style.display = 'block';
  }

}
