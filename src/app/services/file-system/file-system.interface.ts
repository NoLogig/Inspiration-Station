/*******    NativeFileSystem Interface - Helpers    *******/

export interface IFileSystemHandle {
  isDirectory: boolean;
  isFile: boolean;
  name: string;

  queryPermission(descriptor?: IFileSystemHandlePermissionDescriptor): Promise<PermissionState>;
  requestPermission(descriptor?: IFileSystemHandlePermissionDescriptor): Promise<PermissionState>;
}

export interface IFileSystemFileHandle extends IFileSystemHandle {
  isFile: true;
  isDirectory: false;

  getFile?(): Promise<File>;
  createWriter(options?: IFileSystemCreateWriterOptions): Promise<IFileSystemWriter>;
}

export interface IFileSystemDirectoryHandle extends IFileSystemHandle {
  isFile: false;
  isDirectory: true;

  getFile?(name: string, options: IFileSystemGetFileOptions): Promise<IFileSystemFileHandle>;
  getDirectory?(name: string, options: IFileSystemGetDirectoryOptions): Promise<IFileSystemDirectoryHandle>;

  getEntries?(): AsyncIterable<IFileSystemDirectoryHandle | IFileSystemFileHandle>;
  removeEntry?(name: string, options: IFileSystemRemoveOptions): Promise<void>;
}

export type IChooseFileSystemEntriesType = "openFile" | "saveFile" | "openDirectory";

export type IFileSystemEntries = IFileSystemFileHandle | IFileSystemDirectoryHandle | IFileSystemDirectoryHandle[] | IFileSystemFileHandle[];

export interface IChooseFileSystemEntriesOptions {
  accepts?: IChooseFileSystemOptionsAccepts[];
  excludeAcceptAllOptions?: boolean;
  multiple?: boolean;
  readOnly?: boolean;
  recursive?: boolean;
  suggestedStartLocation?: string;
  type?: IChooseFileSystemEntriesType;
}

export interface IFileSystemWriter {
  write(position: number, data: Blob | BufferSource | string): Promise<void>;
  truncate(size: number): Promise<void>;
  close(): Promise<void>;
  asWritableStream(): WritableStream<Uint8Array>;
}

export interface IFileSystemHandlePermissionDescriptor {
  writable?: boolean;
}
export interface IFileSystemCreateWriterOptions {
  keepExistingData?: boolean;
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
export interface IChooseFileSystemOptionsAccepts {
  description?: string;
  extensions?: string[];
  mineTypes?: string[];
}

export interface IChooseFileSystemEntriesOptionsMultiple extends IChooseFileSystemEntriesOptions {
  multiple: true;
}
export interface IChooseFileSystemEntriesOptionsDirectory extends IChooseFileSystemEntriesOptions {
  type: 'openDirectory';
  multiple?: false;
}
export interface IChooseFileSystemEntriesOptionsDirectoryMultiple extends IChooseFileSystemEntriesOptions {
  type: 'openDirectory';
  multiple: true;
}
export interface IChooseFileSystemEntriesOptionsFile extends IChooseFileSystemEntriesOptions {
  type?: 'openFile' | 'saveFile';
  multiple?: false;
}
export interface IChooseFileSystemEntriesOptionsFileMultiple extends IChooseFileSystemEntriesOptions {
  type?: 'openFile' | 'saveFile';
  multiple: true;
}

export declare function chooseFileSystemEntries(options?: IChooseFileSystemEntriesOptionsFile): Promise<IFileSystemFileHandle>;
export declare function chooseFileSystemEntries(options?: IChooseFileSystemEntriesOptionsFileMultiple): Promise<IFileSystemFileHandle[]>;
export declare function chooseFileSystemEntries(options?: IChooseFileSystemEntriesOptionsDirectory): Promise<IFileSystemDirectoryHandle>;
export declare function chooseFileSystemEntries(options?: IChooseFileSystemEntriesOptionsDirectoryMultiple): Promise<IFileSystemDirectoryHandle[]>;
export declare function chooseFileSystemEntries(options?: IChooseFileSystemEntriesOptionsMultiple): Promise<Array<IFileSystemDirectoryHandle | IFileSystemFileHandle>>;
export declare function chooseFileSystemEntries(options?: IChooseFileSystemEntriesOptions): Promise<IFileSystemDirectoryHandle | IFileSystemFileHandle>;

export interface IWindow extends Window {
  chooseFileSystemEntries?: typeof chooseFileSystemEntries;
}

// export interface IWindow extends Window {
//   chooseFileSystemEntries?: (options?: IChooseFileSystemEntriesOptions ) =>  IFileSystemFileHandle | IFileSystemDirectoryHandle;
// }
