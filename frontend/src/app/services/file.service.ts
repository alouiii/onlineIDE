import { Injectable } from '@angular/core';
import { File } from '../interfaces/file';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private currentFileSubject: Subject<File | null> = new Subject<File | null>();
  private allFiles: File[] = [
    {
      id: '1',
      fileName: 'Project 1.js',
      code: 'function x() {\nconsole.log("Hello world!");\n}',
    },
    {
      id: '2',
      fileName: 'Project 2.py',
      code: 'print("Hello World")',
    },
  ];

  private _currentFile: File | null = null;

  constructor() {
    if (this.allFiles.length > 0) {
      this.currentFile = this.allFiles[0];
    }
  }

  set currentFile(file: File | null) {
    this._currentFile = file;
    this.currentFileSubject.next(file);
  }

  get currentFile(): File | null {
    return this._currentFile;
  }

  selectedFile: File | null = null;

  isRenaming: boolean = false;

  updateSelectedFile(file: File | null) {
    this.selectedFile = file;
  }

  updateCurrentFile(file: File | null) {
    this.currentFile = file;
  }

  get files() {
    return this.allFiles;
  }

  addFile(file: File) {
    this.allFiles.unshift(file);
    this.currentFile = file;
  }

  removeFile(file: File) {
    const index = this.allFiles.indexOf(file);
    if (index !== -1) {
      this.allFiles.splice(index, 1);
      if (this.currentFile === file) {
        this.currentFile = null;
      }
    }
  }

  renameFile(file: File, newName: string) {
    const index = this.allFiles.indexOf(file);
    if (index !== -1) {
      const updatedFile: File = {
        ...file,
        fileName: newName,
      };
      this.allFiles[index] = updatedFile;
      if (this.currentFile === file) {
        this.currentFile = updatedFile;
      }
    }
  }

  get currentFile$() {
    return this.currentFileSubject.asObservable();
  }
}
