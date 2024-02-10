import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from 'src/app/services/file.service';
import { File } from 'src/app/interfaces/file';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ApiClientService } from 'src/app/services/api-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, NavbarComponent],
})
export class ProjectsSectionComponent {
  isEditable: boolean = false;
  projects: Project[] = [];
  showUserIds: boolean = false;
  errorMessage: string = '';

  @Output() projectNameEdited: EventEmitter<string> =
    new EventEmitter<string>();

  onCellHover(shouldEdit: boolean, project: Project): void {
    this.isEditable = shouldEdit;
    project.isEditable = shouldEdit;
  }

  onClickUsers() {
    this.showUserIds = !this.showUserIds;
  }

  private userId : any = ""

  constructor(
    private fileService: FileService,
    private router: Router,
    private apiClientService: ApiClientService,
  ) {}

  ngOnInit(): void {
    let options = {};
    this.apiClientService.getData('/user').pipe(
      catchError(() => {
        this.errorMessage = 'Server Error occurred!';
        return "";
      })
    ).subscribe((response: any) => {
      this.userId = response['userId'];
      this.loadProjects();
    });
  }

  private loadProjects() {
    this.apiClientService
      .postData('/project', { 'userId': this.userId })
      .pipe(
        catchError(() => {
          this.errorMessage = 'Server Error occurred!';
          return [];
        })
      )
      .subscribe((response: Project[]) => {
        this.projects = response;
      });
  }

  addProject(): void {
    const newProjectId = this.generateUniqueProjectId();
    const newProjectName = `Project_${newProjectId}`;

    this.apiClientService
      .postData('/project', { name: newProjectName, 'userId': this.userId })
      .pipe(
        catchError(() => {
          this.errorMessage = 'Server Error occurred!';
          return [];
        })
      )
      .subscribe((response: Project) => {
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

  renameProject(project: Project): void {
    project.isEditable = false;
    this.isEditable = false;
    this.apiClientService
      .updateData('/project/' + project.id, project)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.errorMessage = 'A project with that name already exists!';
            project.hasErrors = true;
          } else {
            this.errorMessage = 'Server Error occurred!';
          }
          return [];
        })
      )
      .subscribe(() => {
        this.errorMessage = '';
        project.hasErrors = false;
      });
  }

  openProject(project: Project): void {
    if (!project.hasErrors) {
      const fileToOpen = this.fileService.files.find(
        (file) => file.id === project.id
      );
      if (fileToOpen) {
        this.fileService.updateCurrentFile(fileToOpen);
      }
      this.router.navigate(['/editor/' + project.id]);
    }
  }

  deleteProject(projectId: string): void {
    this.projects = this.projects.filter((project) => project.id !== projectId);
    this.apiClientService
      .deleteData('/project/' + projectId)
      .pipe(
        catchError(() => {
          this.errorMessage = 'Server Error occurred!';
          return [];
        })
      )
      .subscribe();
  }
}
