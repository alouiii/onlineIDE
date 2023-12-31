import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ApiClientService } from '../services/api-client.service';
import { TerminalComponent } from '../terminal/terminal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { File } from '../interfaces/file';
import {
  MatDialog,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    CodeEditorComponent,
    TerminalComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FileDialogComponent,
    MatDialogModule,
  ],
})
export class SidenavComponent {
  constructor(
    private apiClient: ApiClientService,
    private dialog: MatDialog,
    public fileService: FileService
  ) {
    //this.apiClient.getData('/todos').subscribe((data) => console.log(data)); just an example of call
  }
}
