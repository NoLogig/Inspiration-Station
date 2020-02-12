import { Injectable } from '@angular/core';
import {
  IWindow, IChooseFileSystemEntriesOptionsFileMultiple, IFileSystemEntries, IFileSystemFileHandle,
  IFileSystemDirectoryHandle, IChooseFileSystemEntriesOptionsDirectoryMultiple, IChooseFileSystemEntriesOptions,
  IChooseFileSystemEntriesOptionsFile, IChooseFileSystemEntriesOptionsDirectory, IChooseFileSystemEntriesOptionsMultiple, IChooseFileSystemEntriesType
} from './file-system.interface';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  private window: IWindow = window;

  public handler: IFileSystemEntries;
  public options: IChooseFileSystemEntriesOptions;

  public file_ref: IFileSystemFileHandle;
  public file_refs: IFileSystemFileHandle[];

  public dir_ref: IFileSystemDirectoryHandle;
  public dir_refs: IFileSystemDirectoryHandle[];

  public entry: IFileSystemFileHandle | IFileSystemDirectoryHandle;
  public entries: IFileSystemFileHandle[] | IFileSystemDirectoryHandle[];

  public file_reader: FileReader;

  constructor() {
    this.initOptions();
  }

  initOptions(options?: IChooseFileSystemEntriesOptions) {

    if (options) {
      this.options = options;
      return;
    }

    this.options = {
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

  async openPicker() {

    try {

      if (!this.options.multiple) {

        if (this.options.type === "openFile") {
          this.handler = this.file_ref = await this.window.chooseFileSystemEntries(this.options as IChooseFileSystemEntriesOptionsFile);
        }

        if (this.options.type === "openDirectory") {
          this.handler = this.dir_ref = await this.window.chooseFileSystemEntries(this.options as IChooseFileSystemEntriesOptionsDirectory);
        }

        this.handler = this.entry = await this.window.chooseFileSystemEntries(this.options as IChooseFileSystemEntriesOptions);
        return;

      }

      if (this.options.multiple) {

        if (this.options.type === "openFile") {
          this.handler = this.file_refs = await this.window.chooseFileSystemEntries(this.options as IChooseFileSystemEntriesOptionsFileMultiple);
          return;
        }

        if (this.options.type === "openDirectory") {
          this.handler = this.dir_refs = await this.window.chooseFileSystemEntries(this.options as IChooseFileSystemEntriesOptionsDirectoryMultiple);
          return;
        }

        this.handler = this.entries = await this.window.chooseFileSystemEntries(this.options as IChooseFileSystemEntriesOptionsMultiple);
        return;

      }

      // User cancelled, or otherwise failed
    } catch (err) { console.info(err) }

  }

  async getFile(handler: IFileSystemFileHandle) {

    if (!this.handler) { return }

    let file = await handler.getFile();

    console.log(file);

  }

  async getFiles(handler: IFileSystemFileHandle[]) {

    if (!this.handler) { return }

    let files = [];

    for await (let item of handler) {
      files.push(item.getFile());
    }
    // await this.file_refs.forEach(item => { files.push(item.getFile()); });

    console.log(await files);

  }

  async getDir(handler: IFileSystemDirectoryHandle) {

    if (!this.handler) { return }

    let dir = await this.dir_ref.getDirectory(this.dir_ref.name, { create: false });

    console.log(dir);

  }

  async getDirs(handler: IFileSystemDirectoryHandle[]) {

    const dir_refs = await this.window.chooseFileSystemEntries({ type: 'openDirectory' });
    
    // if (!this.handler) { return }
    if (!dir_refs) {
      // User cancelled, or otherwise failed to open a directory.
      return;
    }
    // Read directory contents.
    for await (const entry of dir_refs.getEntries()) {
      // entry is a FileSystemFileHandle or a FileSystemDirectoryHandle.
    }

    // Get a specific file.
    const file_ref = await dir_refs.getFile('foo.js');
    // Do something useful with the file.

    // Get a subdirectory.
    const subdir = await dir_refs.getDirectory('bla', { create: true });

    // No special API to create copies, but still possible to do so by using available read and write APIs.
    const new_file = await dir_refs.getFile('new_name', { create: true });
    const new_file_writer = await new_file.createWriter();
    await new_file_writer.truncate(0);
    await new_file_writer.write(0, await file_ref.getFile());
  }

  async writer() {

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
      const file_writer = await this.file_ref.createWriter();
      await file_writer.write(0, new Blob(['foobar']));
      await file_writer.write(1024, new Blob(['bla']));

      // Can also write using a WritableStream
      let stream = file_writer.asWritableStream();

      // Can also write contents of a ReadableStream.
      let response = await fetch('foo');
      await response.body.pipeTo(stream);

    };

    // handler.file() method will reject if site (no longer) has access to the file.
    let file = await this.file_ref.getFile();

    // readAsArrayBuffer() is async and returns immediately.
    // |file_reader|'s onload handler will be called with the result of the file read.
    this.file_reader.readAsArrayBuffer(file);

  }

}
