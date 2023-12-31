import { Injectable } from '@angular/core';
import { File } from '../interfaces/file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  allFiles: File[] = [
    {
      name: 'ciao',
      extension: 'c',
    },
    {
      name: 'ciao',
      extension: 'c',
    },
    {
      name: 'ciao',
      extension: 'c',
    },
  ];

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
}
