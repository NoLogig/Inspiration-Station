import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  window: IWindow = window;
  filesystem_handler: IFSFDHandle;
  filesystem_options: IChooseFileSystemEntriesOptions;

  file_reader: FileReader;

  constructor() {
    this.initFileSystemOptions();
  }

  initFileSystemOptions(options?: IChooseFileSystemEntriesOptions) {

    if(options) {
      this.filesystem_options = options;
      return;
    }

    this.filesystem_options = {
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
        description: 'Texts',
        extensions: ['txt', 'json', 'md']
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

  async fileSystem() {

    try {
      // Show a file picker to open a file.
      this.filesystem_handler = await this.window.chooseFileSystemEntries(this.filesystem_options);

      // User cancelled, or otherwise failed to open a file.
      if (!this.filesystem_handler) { return }
      console.log(this.filesystem_handler);

      let file = await this.filesystem_handler.getFile();
      console.log(file);

    } catch (err) { console.log(err) }

  }

  async fileWriter() {
    
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
      // access for this website to this file after it acquired the file
      // reference.
      const file_writer = await this.filesystem_handler.createWriter();
      await file_writer.write(0, new Blob(['foobar']));
      await file_writer.write(1024, new Blob(['bla']));

      // Can also write using a WritableStream
      let stream = file_writer.asWritableStream();
      // Can also write contents of a ReadableStream.
      let response = await fetch('foo');
      await response.body.pipeTo(stream);
      
    };

    // filesystem_handler.file() method will reject if site (no longer) has access to the file.
    let file = await this.filesystem_handler.getFile();

    // readAsArrayBuffer() is async and returns immediately. |file_reader|'s onload
    // handler will be called with the result of the file read.
    this.file_reader.readAsArrayBuffer(file);

  }

}


export interface IFileSystemHandlePermissionDescriptor {
  writable?: boolean;
}

export interface IFileSystemHandle {
  readonly isDirectory: boolean;
  readonly isFile: boolean;
  readonly name: string;

  queryPermission(descriptor?: IFileSystemHandlePermissionDescriptor): Promise<PermissionState>;
  requestPermission(descriptor?: IFileSystemHandlePermissionDescriptor): Promise<PermissionState>;
}

export interface IFileSystemCreateWriterOptions {
  keepExistingData?: boolean;
}

export interface IFileSystemFileHandle extends IFileSystemHandle {
  readonly isFile: true;
  readonly isDirectory: false;

  getFile(): Promise<IFSFile>;
  createWriter: (options?: IFileSystemCreateWriterOptions) => Promise<IFileSystemWriter>;
}

export interface IFileSystemGetFileOptions {
  create?: boolean;
}

export interface IFileSystemGetDirectoryOptions {
  create?: boolean;
}

export interface IFileSystemRemoveOptions {
  recursive?: boolean;
}

export interface IFileSystemDirectoryHandle extends IFileSystemHandle {
  readonly isFile: false;
  readonly isDirectory: true;

  getFile(name: string, options: IFileSystemGetFileOptions): Promise<IFileSystemFileHandle>;
  getDirectory: (name: string, options: IFileSystemGetDirectoryOptions) => Promise<IFileSystemDirectoryHandle>;

  getEntries(): AsyncIterable<IFileSystemDirectoryHandle | IFileSystemFileHandle>;
  removeEntry: (name: string, options: IFileSystemRemoveOptions) => Promise<void>;
}

export interface IFSFDHandle extends IFileSystemHandle {

  createWriter?: (options?: IFileSystemCreateWriterOptions) => Promise<IFileSystemWriter>;
  getFile?(): Promise<IFSFile>;

  getFile?(name: string, options: IFileSystemGetFileOptions): Promise<IFileSystemFileHandle>;
  getDirectory?: (name: string, options: IFileSystemGetDirectoryOptions) => Promise<IFileSystemDirectoryHandle>;

  getEntries?(): AsyncIterable<IFileSystemDirectoryHandle | IFileSystemFileHandle>;
  removeEntry?: (name: string, options: IFileSystemRemoveOptions) => Promise<void>;
}

export interface IFileSystemWriter {
  write(position: number, data: Blob | BufferSource | string): Promise<void>;
  truncate(size: number): Promise<void>;
  close(): Promise<void>;
  asWritableStream(): WritableStream<Uint8Array>;
}

export interface IFSFile extends File {
  text();
  sclice();
  stream();
  arrayBuffer();
}

export type IChooseFileSystemEntriesType = "openFile" | "saveFile" | "openDirectory";

export interface IChooseFileSystemOptionsAccepts {
  description?: string;
  extensions?: string[];
  mineTypes?: string[];
}

export interface IChooseFileSystemEntriesOptions {
  accepts?: IChooseFileSystemOptionsAccepts[];
  excludeAcceptAllOptions?: boolean;
  multiple?: boolean;
  readOnly?: boolean;
  recursive?: boolean;
  suggestedStartLocation?: string;
  type?: IChooseFileSystemEntriesType;
}

// export interface IChooseFileSystemEntriesOptionsMultiple extends IChooseFileSystemEntriesOptions {
//   multiple: true;
// }
// export interface IChooseFileSystemEntriesOptionsDirectory extends IChooseFileSystemEntriesOptions {
//   type: 'openDirectory';
//   multiple?: false;
// }
// export interface IChooseFileSystemEntriesOptionsDirectoryMultiple extends IChooseFileSystemEntriesOptions {
//   type: 'openDirectory';
//   multiple: true;
// }
// export interface IChooseFileSystemEntriesOptionsFile extends IChooseFileSystemEntriesOptions {
//   type?: 'openFile' | 'saveFile';
//   multiple?: false;
// }
// export interface IChooseFileSystemEntriesOptionsFileMultiple extends IChooseFileSystemEntriesOptions {
//   type?: 'openFile' | 'saveFile';
//   multiple: true;
// }

// declare function chooseFileSystemEntries(
//   options?: IChooseFileSystemEntriesOptionsFile,
// ): Promise<IFileSystemFileHandle>;
// declare function chooseFileSystemEntries(
//   options?: IChooseFileSystemEntriesOptionsFileMultiple,
// ): Promise<IFileSystemFileHandle[]>;
// declare function chooseFileSystemEntries(
//   options?: IChooseFileSystemEntriesOptionsDirectory,
// ): Promise<IFileSystemDirectoryHandle>;
// declare function chooseFileSystemEntries(
//   options?: IChooseFileSystemEntriesOptionsDirectoryMultiple,
// ): Promise<IFileSystemDirectoryHandle[]>;
// declare function chooseFileSystemEntries(
//   options?: IChooseFileSystemEntriesOptionsMultiple,
// ): Promise<Array<IFileSystemDirectoryHandle | IFileSystemFileHandle>>;
// declare function chooseFileSystemEntries(
//   options?: IChooseFileSystemEntriesOptions,
// ): Promise<IFileSystemDirectoryHandle | IFileSystemFileHandle>;
export interface IWindow extends Window {
  // chooseFileSystemEntries?: typeof chooseFileSystemEntries;
  chooseFileSystemEntries?: (options?: IChooseFileSystemEntriesOptions ) => IFSFDHandle;
}
