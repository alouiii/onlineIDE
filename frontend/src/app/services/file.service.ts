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
  ];

  get files() {
    return this.allFiles;
  }

  addFile(name: string, extension: string) {
    this.allFiles.unshift({
      name,
      extension,
    });
  }
}
