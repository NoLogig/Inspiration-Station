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

  getFile?(name: string, options?: IFileSystemGetFileOptions): Promise<IFileSystemFileHandle>;
  getDirectory?(name: string, options?: IFileSystemGetDirectoryOptions): Promise<IFileSystemDirectoryHandle>;

  getEntries?(): AsyncIterable<IFileSystemDirectoryHandle | IFileSystemFileHandle>;
  removeEntry?(name: string, options: IFileSystemRemoveOptions): Promise<void>;
}

export interface IOptions {  
  file: IChooseFileSystemEntriesOptionFile;
  files: IChooseFileSystemEntriesOptionFileMultiple;
  dir: IChooseFileSystemEntriesOptionDirectory;
  dirs: IChooseFileSystemEntriesOptionDirectoryMultiple;
};
export interface IChooseFileSystemEntriesOption {
  accepts?: IChooseFileSystemOptionsAccepts[];
  excludeAcceptAllOptions?: boolean;
  multiple?: boolean;
  readOnly?: boolean;
  recursive?: boolean;
  suggestedStartLocation?: string;
  type?: IChooseFileSystemEntriesType;
}
export type IChooseFileSystemEntriesType = "openFile" | "saveFile" | "openDirectory";
export type IFileSystemEntries = IFileSystemFileHandle | IFileSystemDirectoryHandle | IFileSystemDirectoryHandle[] | IFileSystemFileHandle[];


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

export interface IChooseFileSystemEntriesOptionMultiple extends IChooseFileSystemEntriesOption {
  multiple: true;
}
export interface IChooseFileSystemEntriesOptionDirectory extends IChooseFileSystemEntriesOption {
  type: 'openDirectory';
  multiple?: false;
}
export interface IChooseFileSystemEntriesOptionDirectoryMultiple extends IChooseFileSystemEntriesOption {
  type: 'openDirectory';
  multiple: true;
}
export interface IChooseFileSystemEntriesOptionFile extends IChooseFileSystemEntriesOption {
  type?: 'openFile' | 'saveFile';
  multiple?: false;
}
export interface IChooseFileSystemEntriesOptionFileMultiple extends IChooseFileSystemEntriesOption {
  type?: 'openFile' | 'saveFile';
  multiple: true;
}

export declare function chooseFileSystemEntries(option?: IChooseFileSystemEntriesOptionFileMultiple):      Promise<IFileSystemFileHandle[]>;
export declare function chooseFileSystemEntries(option?: IChooseFileSystemEntriesOptionFile):              Promise<IFileSystemFileHandle>;
export declare function chooseFileSystemEntries(option?: IChooseFileSystemEntriesOptionDirectoryMultiple): Promise<IFileSystemDirectoryHandle[]>;
export declare function chooseFileSystemEntries(option?: IChooseFileSystemEntriesOptionDirectory):         Promise<IFileSystemDirectoryHandle>;
export declare function chooseFileSystemEntries(option?: IChooseFileSystemEntriesOptionMultiple):          Promise<IFileSystemDirectoryHandle[] | IFileSystemFileHandle[]>;
export declare function chooseFileSystemEntries(option?: IChooseFileSystemEntriesOption):                  Promise<IFileSystemDirectoryHandle | IFileSystemFileHandle>;

export interface IWindow extends Window {
  chooseFileSystemEntries?: typeof chooseFileSystemEntries;
}

// export interface IWindow extends Window {
//   chooseFileSystemEntries?: (options?: IChooseFileSystemEntriesOptions ) =>  IFileSystemFileHandle | IFileSystemDirectoryHandle;
// }
