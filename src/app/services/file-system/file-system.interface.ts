
export type IChooseFileSystemEntriesType = 'open-file' | 'save-file' | 'open-directory';

export interface IChooseFileSystemEntriesOptionsAccepts {
  description?: string;
  mimeTypes?: string[];
  extensions?: string[];
}

export interface IChooseFileSystemEntriesOptions {
  type?: IChooseFileSystemEntriesType;
  multiple?: boolean;
  readOnly?: boolean;
  accepts?: IChooseFileSystemEntriesOptionsAccepts[];
  excludeAcceptAllOption?: boolean;
  suggestedStartLocation?: string;
}

export interface IChooseFileSystemEntriesOptionsMultiple extends IChooseFileSystemEntriesOptions {
  multiple: true;
}

export interface IChooseFileSystemEntriesOptionsDirectory extends IChooseFileSystemEntriesOptions {
  type: 'open-directory';
  multiple?: false;
}

export interface IChooseFileSystemEntriesOptionsDirectoryMultiple extends IChooseFileSystemEntriesOptions {
  type: 'open-directory';
  multiple: true;
}

export interface IChooseFileSystemEntriesOptionsFile extends IChooseFileSystemEntriesOptions {
  type?: 'open-file' | 'save-file';
  multiple?: false;
}

export interface IChooseFileSystemEntriesOptionsFileMultiple extends IChooseFileSystemEntriesOptions {
  type?: 'open-file' | 'save-file';
  multiple: true;
}

export interface IFileSystemHandlePermissionDescriptor {
  writable?: boolean;
}

export interface IFileSystemHandle {
  readonly isFile: boolean;
  readonly isDirectory: boolean;
  readonly name: string;

  queryPermission(
    descriptor?: IFileSystemHandlePermissionDescriptor,
  ): Promise<PermissionState>;
  requestPermission(
    descriptor?: IFileSystemHandlePermissionDescriptor,
  ): Promise<PermissionState>;
}

export interface IFileSystemCreateWriterOptions {
  keepExistingData?: boolean;
}

export interface IFileSystemFileHandle extends IFileSystemHandle {
  readonly isFile: true;
  readonly isDirectory: false;

  getFile(): File;
  createWriter(
    options?: IFileSystemCreateWriterOptions,
  ): Promise<IFileSystemWriter>;
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

  getFile(
    name: string,
    options?: IFileSystemGetFileOptions,
  ): Promise<IFileSystemFileHandle>;
  getDirectory(
    name: string,
    options?: IFileSystemGetDirectoryOptions,
  ): Promise<IFileSystemDirectoryHandle>;
  getEntries(): AsyncIterable<IFileSystemDirectoryHandle | IFileSystemFileHandle>;
  removeEntry(name: string, options?: IFileSystemRemoveOptions): Promise<void>;
}

export interface IFileSystemWriter {
  write(position: number, data: BufferSource | Blob | string): Promise<void>;
  truncate(size: number): Promise<void>;
  close(): Promise<void>;
}

declare function chooseFileSystemEntries(
  options?: IChooseFileSystemEntriesOptionsFile,
): Promise<IFileSystemFileHandle>;
declare function chooseFileSystemEntries(
  options?: IChooseFileSystemEntriesOptionsFileMultiple,
): Promise<IFileSystemFileHandle[]>;
declare function chooseFileSystemEntries(
  options?: IChooseFileSystemEntriesOptionsDirectory,
): Promise<IFileSystemDirectoryHandle>;
declare function chooseFileSystemEntries(
  options?: IChooseFileSystemEntriesOptionsDirectoryMultiple,
): Promise<IFileSystemDirectoryHandle[]>;
declare function chooseFileSystemEntries(
  options?: IChooseFileSystemEntriesOptionsMultiple,
): Promise<Array<IFileSystemDirectoryHandle | IFileSystemFileHandle>>;
declare function chooseFileSystemEntries(
  options?: IChooseFileSystemEntriesOptions,
): Promise<IFileSystemDirectoryHandle | IFileSystemFileHandle>;

export interface IWindow extends Window {
  chooseFileSystemEntries?: typeof chooseFileSystemEntries;
}