import { Component, ViewChild } from '@angular/core';
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

  @ViewChild('fileDialog') fileDialog!: FileDialogComponent;

  // Use a Map to store the showDropdown state for each file
  showFileDropdownMap: Map<File, boolean> = new Map();

  //selectedFile: File | null = null; // Track the selected file

  handleFileRightClick(event: MouseEvent, file: File): void {
    event.preventDefault();

    // Close all other dropdowns
    this.showFileDropdownMap.forEach((value, key) => {
      this.showFileDropdownMap.set(key, false);
    });

    // Open the dropdown for the clicked file
    this.showFileDropdownMap.set(file, true);

    this.fileService.updateSelectedFile(file);

    // Attach a click event listener to close the dropdown when clicking outside of it
    const outsideClickListener = (e: MouseEvent) => {
      if (!this.isClickInsideDropdown(e) && !this.fileService.isRenaming) {
        this.showFileDropdownMap.forEach((value, key) => {
          this.showFileDropdownMap.set(key, false);
        });
        this.fileService.updateSelectedFile(null);
        this.fileService.isRenaming = false;
        document.removeEventListener('click', outsideClickListener);
      }
    };

    // Add the click event listener
    document.addEventListener('click', outsideClickListener);
  }

  isClickInsideDropdown(event: MouseEvent): boolean {
    const dropdownElement = document.querySelector('.dropdown-menu');
    return dropdownElement?.contains(event.target as Node) ?? false;
  }

  handleFileClick(event: MouseEvent): void {
    //console.log('Regular click event');
  }

  deleteFile() {
    if (this.fileService.selectedFile !== null) {
      this.fileService.removeFile(this.fileService.selectedFile);
    }
  }

  openFileModal() {
    this.fileDialog.openDialog('200ms', '200ms');
    this.fileService.isRenaming = true;
    this.showFileDropdownMap.forEach((value, key) => {
      this.showFileDropdownMap.set(key, false);
    });
  }
}
