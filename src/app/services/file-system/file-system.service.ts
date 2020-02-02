import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {


  constructor(window: IWindow) {
  }


  async fs() {
    let window: IWindow = self.window;
    // Show a file picker to open a file.
    let file_ref = await window.chooseFileSystemEntries({
      type: 'openFile',
      multiple: false, // If true, returns an array rather than a single handle.

      // If true, the resulting file reference won't be writable. Note that there
      // is no guarantee that the resulting file reference will be writable when
      // readOnly is set to false. Both filesystem level permissions as well as
      // browser UI/user intent might result in a file reference that isn't usable
      // for writing, even if the website asked for a writable reference.
      readOnly: false,

      accepts: [{ description: 'Images', extensions: ['jpg', 'gif', 'png'] }],
      suggestedStartLocation: 'pictures-library'
    });

    // User cancelled, or otherwise failed to open a file.
    if (!file_ref) { return; }

    // Read the contents of the file.
    let file_reader = new FileReader();
    file_reader.onload = async (event) => {
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
      const file_writer = await file_ref.createWriter();
      await file_writer.write(0, new Blob(['foobar']));
      await file_writer.write(1024, new Blob(['bla']));

      // Can also write using a WritableStream
      let stream = file_writer.asWritableStream();
      // Can also write contents of a ReadableStream.
      let response = await fetch('foo');
      await response.body.pipeTo(stream);
    };

    // file_ref.file() method will reject if site (no longer) has access to the file.
    let file = await file_ref.file();

    // readAsArrayBuffer() is async and returns immediately.  |file_reader|'s onload
    // handler will be called with the result of the file read.
    file_reader.readAsArrayBuffer(file);
  }

}


export interface IWindow extends Window {
  chooseFileSystemEntries?: (options?: ChooseFileSystemEntriesOptions) => Promise<FileSystemFileHandle>;
}

export interface FileSystemHandle {
  isFile: boolean;
  isDirectory: boolean;
  name: string;
}

export interface FileSystemFileHandle {
  getFile(): Promise<FSFile>;
  file?: () => any;
  createWriter: (options?: FileSystemCreateWriterOptions) => FileSystemWriter;
}

export interface FileSystemDirectoryHandle {
  getFile(name: string, options: FileSystemGetFileOptions): Promise<any>;
  getDirectory: (name: string, options: FileSystemCreateWriterOptions) => {};

  getEntries: () => {};
  removeEntry: (name: string, options: FileSystemRemoveOptions) => Promise<void>;
}

export interface FileSystemHandlePermissionDescriptor {
  writable: boolean;
}

export interface FileSystemCreateWriterOptions {
  keepExistingData: boolean;
}

export interface FileSystemGetFileOptions {
  create: boolean;
}

export interface FileSystemGetDirectoryOptions {
  create: boolean;
}

export interface FileSystemRemoveOptions {
  recursive: boolean;
}

export interface FileSystemWriter {
  write(position: number, data: Blob | BufferSource | string): Promise<void>;
  truncate(size: number): Promise<void>;
  close(): Promise<void>;
  asWritableStream(): WritableStream<Uint8Array>;
}

export enum ChooseFileSystemEntriesType { "open-file", "save-file", "open-directory" };

export interface ChooseFileSystemOptionsAccepts {
  description?: string;
  mineTypes?: string[];
  extensions?: string[];
}
export interface ChooseFileSystemEntriesOptions {
  type?: string;
  multiple?: boolean;
  readOnly: boolean;
  accepts?: ChooseFileSystemOptionsAccepts[];
  excludeAcceptAllOptions?: boolean;
  suggestedStartLocation?: string;
}

export interface FSFile extends File {
  text();
  sclice();
  stream();
  arrayBuffer();
}
