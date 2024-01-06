import { Injectable } from '@angular/core';
import { File } from '../interfaces/file';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {
    if (this.allFiles.length > 0) {
      this.currentFile = this.allFiles[0];
    }
  }

  private currentFileSubject: Subject<File | null> = new Subject<File | null>();

  private allFiles: File[] = [
    {
      id: 'a',
      fileName: 'ciao.js',
      code: 'function x() {\nconsole.log("Hello world!");\n}',
    },
    {
      id: 'b',
      fileName: 'matteo.py',
      code: 'print("Hello World")',
    },
  ];

  private _currentFile: File | null = null;

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
      // If the removed file is the current file, set currentFile to null
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
      // If the renamed file is the current file, update currentFile
      if (this.currentFile === file) {
        this.currentFile = updatedFile;
      }
    }
  }

  // Observable to notify subscribers about changes in the currentFile
  get currentFile$() {
    return this.currentFileSubject.asObservable();
  }
}
