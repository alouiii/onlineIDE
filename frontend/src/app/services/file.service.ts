import { Injectable } from '@angular/core';
import { File } from '../interfaces/file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {
    if (this.allFiles.length > 0) {
      this.currentFile = this.allFiles[0];
    }
  }

  allFiles: File[] = [
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

  currentFile: File | null = null;

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
    }
  }
}
