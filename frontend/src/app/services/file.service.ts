import { Injectable } from '@angular/core';
import { File } from '../interfaces/file';
import { Subject } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private currentFileSubject: Subject<File | null> = new Subject<File | null>();

  private _currentFile: File | null = null;

  constructor(private apiClientService: ApiClientService) {}

  set currentFile(file: File | null) {
    this._currentFile = file;
    this.currentFileSubject.next(file);
  }

  get currentFile(): File | null {
    return this._currentFile;
  }

  selectedFile: File | null = null;

  currentProject: Project | null = null;

  currentProjectFiles: File[] = [];

  isRenaming: boolean = false;

  isSharing: boolean = false;

  updateSelectedFile(file: File | null) {
    this.selectedFile = file;
  }

  updateCurrentFile(file: File | null) {
    this.currentFile = file;
  }

  get files() {
    return this.currentProjectFiles;
  }

  addFile(fileName: string) {
    this.apiClientService
      .postData(`/project/${this.currentProject?.id}/file`, {
        fileName,
      })
      .subscribe((response: File) => {
        this.currentProjectFiles.push(response);
        this.currentFile = response;
      });
  }

  removeFile(file: File) {
    const index = this.currentProjectFiles.indexOf(file);
    if (index !== -1) {
      this.currentProjectFiles.splice(index, 1);
      if (this.currentFile === file) {
        this.currentFile = null;
      }
    }
  }

  renameFile(file: File, newName: string) {
    const index = this.currentProjectFiles.indexOf(file);
    if (index !== -1) {
      const updatedFile: File = {
        ...file,
        fileName: newName,
      };
      this.currentProjectFiles[index] = updatedFile;
      if (this.currentFile === file) {
        this.currentFile = updatedFile;
      }
    }
  }

  shareProject(username: string) {
    if (this.currentProject !== null) {
      this.apiClientService
        .updateData(`/project/${this.currentProject?.id}/share`, {
          username,
        })
        .subscribe((response: Project) => {
          console.log('share project: ', response);
        });
    }
  }

  get currentFile$() {
    return this.currentFileSubject.asObservable();
  }
}
