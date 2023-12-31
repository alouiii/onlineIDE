import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FileService } from 'src/app/services/file.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class FileDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      position: {
        top: '10%',
      },
    });
  }
}

@Component({
  standalone: true,
  selector: 'dialog-animations-dialog',
  templateUrl: 'file-dialog-template.html',
  styleUrls: ['file-dialog-template.css'],
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatDividerModule, FormsModule],
})
export class DialogAnimationsDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsDialog>,
    public fileService: FileService
  ) {}
  private createFile(file: string) {
    const [name, extension] = file.split('.');
    this.fileService.addFile({ name, extension });
    this.dialogRef.close();
  }

  private renameFile(newName: string) {
    if (this.fileService.selectedFile !== null) {
      this.fileService.renameFile(this.fileService.selectedFile, newName);
      this.dialogRef.close();
      this.fileService.isRenaming = false;
    }
  }

  performAction(newFileName: string): void {
    if (this.fileService.isRenaming) {
      this.renameFile(newFileName);
    } else {
      this.createFile(newFileName);
    }
    // Close the dialog after either creating or renaming
    this.dialogRef.close();
  }
}
