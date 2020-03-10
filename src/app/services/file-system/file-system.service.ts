import { Injectable } from '@angular/core';
import {
  IWindow, IChooseFileSystemEntriesOptionFileMultiple, IFileSystemEntries, IFileSystemFileHandle,
  IFileSystemDirectoryHandle, IChooseFileSystemEntriesOptionDirectoryMultiple, IChooseFileSystemEntriesOption,
  IChooseFileSystemEntriesOptionFile, IChooseFileSystemEntriesOptionDirectory, IChooseFileSystemEntriesOptionMultiple, IChooseFileSystemEntriesType, IOptions
} from './file-system.interface';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  private window: IWindow = window;

  private options: IOptions;
  private option: IChooseFileSystemEntriesOption;

  public handler: IFileSystemEntries;

  public file_ref: IFileSystemFileHandle;
  public file_refs: IFileSystemFileHandle[];

  public dir_ref: IFileSystemDirectoryHandle;
  public dir_refs: IFileSystemDirectoryHandle[];

  public entry: IFileSystemFileHandle | IFileSystemDirectoryHandle;
  public entries: IFileSystemFileHandle[] | IFileSystemDirectoryHandle[];

  private file_reader: FileReader;

  constructor() {

    this.initOptions();

  }

  /* ####  FileSystem - Options    #### */
  
  initOptions(option?: IChooseFileSystemEntriesOption) {

    if(!option) {

      this.options = {

        file: {
          type: 'openFile',
          // If true, returns an array rather than a single handle.
          multiple: false,
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
        },
        files: {
          type: 'openFile',
          multiple: true,
          readOnly: true,
          accepts: [{
            description: 'All',
            extensions: ['*']
          }]
        },
        dir: {
          type: 'openDirectory',
          multiple: false,
          readOnly: true,
          accepts: [{
            description: 'All',
            extensions: ['*']
          }]
        },
        dirs: {
          type: 'openDirectory',
          multiple: true,
          readOnly: true,
          accepts: [{
            description: 'All',
            extensions: ['*']
          }]
        }

      };

      this.option = this.options.dirs;

      return;

    }

    this.option = option;
    
  }

  /* ####  FileSystem - Picker     #### */

  async openPicker() {

    try {

      if (this.option.multiple) {

        if (this.option.type === "openDirectory") {
          this.handler = this.dir_refs = await this.window.chooseFileSystemEntries(this.option as IChooseFileSystemEntriesOptionDirectoryMultiple);
          return;
        }

        if (this.option.type === "openFile") {
          this.handler = this.file_refs = await this.window.chooseFileSystemEntries(this.option as IChooseFileSystemEntriesOptionFileMultiple);
          return;
        }

        this.handler = this.entries = await this.window.chooseFileSystemEntries(this.option as IChooseFileSystemEntriesOptionMultiple);

        return;
      }

      if (!this.option.multiple) {

        if (this.option.type === "openDirectory") {
          this.handler = this.dir_ref = await this.window.chooseFileSystemEntries(this.option as IChooseFileSystemEntriesOptionDirectory);
          return;
        }

        if (this.option.type === "openFile") {
          this.handler = this.file_ref = await this.window.chooseFileSystemEntries(this.option as IChooseFileSystemEntriesOptionFile);
          return;
        }

        this.handler = this.entry = await this.window.chooseFileSystemEntries(this.option as IChooseFileSystemEntriesOption);

        return;
      }

      // User cancelled, or otherwise failed
    } catch (err) { console.info(err) }

  }

  /* ####  FileSystem - Handlers   #### */

  async getFile(handler?: IFileSystemFileHandle): Promise<File> {

    if (!handler) { return }

    let file = await handler.getFile();

    console.log(await file);
    return await file;

  }

  async getFiles(handler?: IFileSystemFileHandle[]): Promise<File[]> {

    if (!handler) { return }

    let files: File[] = [];

    for (let item of handler) {
      files.push(await item.getFile());
    }

    console.log(await files);
    return await files;

  }

  async getDirectory(handler?: IFileSystemDirectoryHandle) {

    // User cancelled, or otherwise failed to open a directory.
    if (!handler) { return }

    // Read directory contents.
    // entry is a FileSystemFileHandle or a FileSystemDirectoryHandle.
    for await (let entry of handler.getEntries()) {

      if (entry.isDirectory) {
        // let dir = await this.dir_ref.getDirectory(entry.name, { create: false });
        console.info("Dir\nDir", entry);
        this.getDirectory(entry);
      }

      // NOTE: Thought desktop.ini was removed after Win7, curios it's still there... 
      // TODO: Check if the new Explorer Dark Mode is the same like in Win7... if (shame on MicroSoft) else ( WTF )
      if (entry.isFile && entry.name !== "desktop.ini") {
        // let file = await this.dir_ref.getFile(entry.name, { create: false });
        console.warn("Dir\nFile", entry);
      }

    }

    // console.log(dir);
    // return dir;
  }

  async getDirectories(handler?: IFileSystemDirectoryHandle[]) {

    if (!handler) { return }

    for await (let entry of handler) {

      if (entry.isDirectory) {
        console.info("Sub\nDir", entry);
        this.getDirectory(entry);
      }

      if (entry.isFile) {
        console.warn("Sub\nFile", entry);
        entry.getFile(entry.name, {create: false});
      }

    }

  }

  /* ####  FileSystem - Writers?   #### */

  async test(dir_refs: IFileSystemDirectoryHandle) {

    // Get a specific file.
    let file_ref = await dir_refs.getFile('foo.js');
    // Do something useful with the file.

    // Get a specific subdirectory.
    let subdir = await dir_refs.getDirectory('bla', { create: true });
    // Do something useful with the directory.

    // Thre is no special API available to create copies, but's still possible, by using read & write APIs.
    let copy = await dir_refs.getFile('new_name', { create: true });
    let copied_writer = await copy.createWriter();
    await copied_writer.truncate(0);
    await copied_writer.write(0, await file_ref.getFile());

    // return dirs;
  }

  async writer(file_ref: IFileSystemFileHandle) {

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
      let file_writer = await file_ref.createWriter();
      await file_writer.write(0, new Blob(['foobar']));
      await file_writer.write(1024, new Blob(['bla']));

      // Can also write using a WritableStream
      let stream = file_writer.asWritableStream();

      // Can also write contents of a ReadableStream.
      let response = await fetch('foo');
      await response.body.pipeTo(stream);

    };

    // handler.file() method will reject if site (no longer) has access to the file.
    let file = await file_ref.getFile();

    // readAsArrayBuffer() is async and returns immediately.
    // |file_reader|'s onload handler will be called with the result of the file read.
    this.file_reader.readAsArrayBuffer(file);

  }

}
