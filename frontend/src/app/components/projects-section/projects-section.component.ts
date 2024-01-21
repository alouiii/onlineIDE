import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from 'src/app/services/file.service';
import { File } from 'src/app/interfaces/file';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, NavbarComponent],
})
export class ProjectsSectionComponent {
  isEditable: boolean = false;
  newProjectName: string = '';
  projects: Project[] = [];

  @Output() projectNameEdited: EventEmitter<string> =
    new EventEmitter<string>();

  onCellHover(shouldEdit: boolean, project: any): void {
    this.isEditable = shouldEdit;
    project.isEditable = shouldEdit;
  }

  constructor(
    private fileService: FileService,
    private router: Router,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects() {
    this.apiClientService
      .getData('/project')
      .subscribe((response: Project[]) => {
        this.projects = response;
        console.log('GET Projects: ', this.projects);
      });
  }

  addProject(): void {
    const newProjectId = this.generateUniqueProjectId();
    const newProjectName = `Project_${newProjectId}`;

    this.apiClientService
      .postData('/project', { name: newProjectName })
      .subscribe((response: Project) => {
        console.log('POST project: ', response);
        this.projects.push(response);
      });
  }

  private generateUniqueProjectId(): number {
    let newProjectId = this.projects.length + 1;
    while (
      this.projects.some((project) => project.id === newProjectId.toString())
    ) {
      newProjectId++;
    }
    return newProjectId;
  }

  saveProject(project: any): void {
    project.isEditable = false;
    this.isEditable = false;
    this.fileService.renameFile(
      { id: project.id.toString(), fileName: project.name, code: '' },
      project.name
    );
    this.apiClientService
      .updateData('/project/' + project.id, project)
      .subscribe((response) => {
        console.log('UPDATE project:', response);
      });
  }

  openProject(projectId: string): void {
    const fileToOpen = this.fileService.files.find(
      (file) => file.id === projectId
    );
    if (fileToOpen) {
      this.fileService.updateCurrentFile(fileToOpen);
    }
    this.router.navigate(['/editor/' + projectId]);
  }

  deleteProject(projectId: string): void {
    this.projects = this.projects.filter((project) => project.id !== projectId);
    this.apiClientService
      .deleteData('/project/' + projectId)
      .subscribe((response) => {
        console.log('DELETE project:', response);
      });
  }
}
