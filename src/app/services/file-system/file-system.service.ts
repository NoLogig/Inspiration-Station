import { Injectable } from '@angular/core';
import {
  IWindow, IChooseFileSystemEntriesOptionsFileMultiple, IFileSystemEntries, IFileSystemFileHandle,
  IFileSystemDirectoryHandle, IChooseFileSystemEntriesOptionsDirectoryMultiple, IChooseFileSystemEntriesOptions,
  IChooseFileSystemEntriesOptionsFile, IChooseFileSystemEntriesOptionsDirectory
} from 'src/app/services/file-system/file-system.interface';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  window: IWindow = window;
  filesystem_handler: IFileSystemEntries;
  filesystem_options: IChooseFileSystemEntriesOptions;

  filesystem_fileHandler: IFileSystemFileHandle;
  filesystem_fileHandlers: IFileSystemFileHandle[];

  filesystem_dirHandler: IFileSystemDirectoryHandle;
  filesystem_dirHandlers: IFileSystemDirectoryHandle[];

  file_reader: FileReader;

  constructor() {
    this.initFileSystemOptions();
  }

  initFileSystemOptions(options?: IChooseFileSystemEntriesOptionsFileMultiple) {

    if (options) {
      this.filesystem_options = options;
      return;
    }

    this.filesystem_options = {
      type: 'openFile',
      // If true, returns an array rather than a single handle.
      multiple: true,
      // If true, the resulting file reference won't be writable. Note that there
      // is no guarantee that the resulting file reference will be writable when
      // readOnly is set to false. Both filesystem level permissions as well as
      // browser UI/user intent might result in a file reference that isn't usable
      // for writing, even if the website asked for a writable reference.
      readOnly: true,
      accepts: [{
        description: 'All',
        extensions: ['*']
      }, {
        description: 'Texts',
        extensions: ['txt', 'json', 'md', 'pdf']
      }, {
        description: 'Images',
        extensions: ['jpeg', 'jpg', 'png', 'gif']
      }, {
        description: 'Videos',
        extensions: ['mp4', 'ogg']
      }]
      // suggestedStartLocation: 'player-library'
    };

  }

  async fileSystem(options?: IChooseFileSystemEntriesOptions) {

    if (options) {
      this.filesystem_options = options;
    }

    if (options.type === "openFile") {

      try {

        if (!this.filesystem_options.multiple) {
          this.filesystem_handler = this.filesystem_fileHandler = await this.window.chooseFileSystemEntries(this.filesystem_options as IChooseFileSystemEntriesOptionsFile);
        }

        if (this.filesystem_options.multiple) {
          this.filesystem_handler = this.filesystem_fileHandlers = await this.window.chooseFileSystemEntries(this.filesystem_options as IChooseFileSystemEntriesOptionsFileMultiple);
        }

        // User cancelled, or otherwise failed
      } catch (err) { console.log(err) }

    }

    if (options.type === "openDirectory") {

      try {

        if (this.filesystem_options.multiple) {
          this.filesystem_handler = this.filesystem_dirHandler = await this.window.chooseFileSystemEntries(this.filesystem_options as IChooseFileSystemEntriesOptionsDirectory);
        }

        if (!this.filesystem_options.multiple) {
          this.filesystem_handler = this.filesystem_dirHandlers = await this.window.chooseFileSystemEntries(this.filesystem_options as IChooseFileSystemEntriesOptionsDirectoryMultiple);
        }

        // User cancelled, or otherwise failed
      } catch (err) { console.log(err) }

    }

  }

  async fileSystemGetFile() {

    if (!this.filesystem_handler) { return }

    let file = await this.filesystem_fileHandler.getFile();

    console.log(file);

  }

  async fileSystemGetFiles() {

    if (!this.filesystem_handler) { return }

    let files = [];

    this.filesystem_fileHandlers.forEach(item => {
      files.push(item.getFile());
    });

    console.log(files);

  }

  async fileSystemGetDir(options?: IChooseFileSystemEntriesOptions) {

    if (!this.filesystem_handler) { return }

    let dir = await this.filesystem_dirHandler.getDirectory(this.filesystem_dirHandler.name, {create: false});
   
    console.log(dir);

  }

  async fileSystemGetDirs(options?: IChooseFileSystemEntriesOptions) {

    if (!this.filesystem_handler) { return }

  }

  async fileSystemWriter() {

    // Read the contents of the file.
    this.file_reader = new FileReader();

    this.file_reader.onload = async (event) => {
      // File contents will appear in event.target.result. 
      // See https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload for more info.

      // ...

      // Write changed contents back to the file. Rejects if file reference is not
      // writable. Note that it is not generally possible to know if a file
      // reference is going to be writable without actually trying to write to it.
      // For example, both the underlying filesystem level permissions for the
      // file might have changed, or the user/user agent might have revoked write
      // access for this website to this file after it acquired the file reference.
      const file_writer = await this.filesystem_fileHandler.createWriter();
      await file_writer.write(0, new Blob(['foobar']));
      await file_writer.write(1024, new Blob(['bla']));

      // Can also write using a WritableStream
      let stream = file_writer.asWritableStream();

      // Can also write contents of a ReadableStream.
      let response = await fetch('foo');
      await response.body.pipeTo(stream);

    };

    // filesystem_handler.file() method will reject if site (no longer) has access to the file.
    let file = await this.filesystem_fileHandler.getFile();

    // readAsArrayBuffer() is async and returns immediately. |file_reader|'s onload
    // handler will be called with the result of the file read.
    this.file_reader.readAsArrayBuffer(file);

  }

}
