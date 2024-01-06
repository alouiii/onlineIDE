import { Injectable } from '@angular/core';
import { File } from '../interfaces/file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  allFiles: File[] = [
    {
      id: 'a',
      fileName: 'ciao.c',
      code: 'Hello World!',
    },
    {
      id: 'b',
      fileName: 'matteo.py',
      code: 'Hello World!',
    },
  ];

  currentFile: File | null = null;

  selectedFile: File | null = null;

  isRenaming: boolean = false;

  updateSelectedFile(file: File | null) {
    this.selectedFile = file;
  }

  get files() {
    return this.allFiles;
  }

  addFile(file: File) {
    this.allFiles.unshift(file);
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
