import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

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
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatDividerModule],
})
export class DialogAnimationsDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsDialog>) {}
}
