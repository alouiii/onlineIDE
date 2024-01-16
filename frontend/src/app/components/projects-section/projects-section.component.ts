import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from 'src/app/services/file.service';
import { File } from 'src/app/interfaces/file';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule],
})
export class ProjectsSectionComponent {
  isEditable: boolean = false;
  newProjectName: string = '';
  projects: Array<{
    id: number;
    name: string;
    users: number;
    isEditable: boolean;
  }> = [
    { id: 1, name: 'Project 1', users: 2, isEditable: false },
    { id: 2, name: 'Project 2', users: 1, isEditable: false },
  ];

  @Output() projectOpened: EventEmitter<number> = new EventEmitter<number>();
  @Output() projectNameEdited: EventEmitter<string> =
    new EventEmitter<string>();

  onCellHover(shouldEdit: boolean): void {
    this.isEditable = shouldEdit;
  }

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.loadProjectsFromLocalStorage();
  }

  private loadProjectsFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    }
  }

  private saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  addProject(): void {
    const newProjectId = this.generateUniqueProjectId();
    const newProjectName = `Project ${newProjectId}`;

    const newProject = {
      id: newProjectId,
      name: newProjectName,
      users: 1,
      isEditable: false,
    };
    this.projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(this.projects));

    const newFile: File = {
      id: newProjectId.toString(),
      fileName: `${newProjectName}.js`,
      code: '// Initial code',
      project: newProjectName,
    };
    this.fileService.addFile(newFile);
    this.saveProjectsToLocalStorage();
  }

  private generateUniqueProjectId(): number {
    let newProjectId = this.projects.length + 1;
    while (this.projects.some((project) => project.id === newProjectId)) {
      newProjectId++;
    }
    return newProjectId;
  }

  editProject(project: any): void {
    project.isEditable = true;
  }

  saveProject(project: any): void {
    project.isEditable = false;
    this.fileService.renameFile(
      { id: project.id.toString(), fileName: project.name, code: '' },
      project.name
    );
  }

  openProject(projectId: number): void {
    const fileToOpen = this.fileService.files.find(
      (file) => file.id === projectId.toString()
    );
    if (fileToOpen) {
      this.fileService.updateCurrentFile(fileToOpen);
    }
    this.projectOpened.emit(projectId);
  }

  deleteProject(projectId: number): void {
    this.projects = this.projects.filter((project) => project.id !== projectId);
    this.saveProjectsToLocalStorage();
  }
}
