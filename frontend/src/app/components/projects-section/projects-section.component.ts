import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule],
})
export class ProjectsSectionComponent {
  isEditable: boolean = false;
  editedText: string = 'ciao';

  onCellHover(shouldEdit: boolean): void {
    this.isEditable = shouldEdit;
  }

  editCell(text: string): void {
    this.editedText = text;
  }

  onEditComplete(): void {
    this.isEditable = false;
  }

  openProject() {}

  deleteProject() {}
}
