import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ApiClientService } from '../api-client.service';
import { TerminalComponent } from '../terminal/terminal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { File } from '../interfaces/file';

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
  ],
})
export class SidenavComponent {
  constructor(private apiClient: ApiClientService) {
    //this.apiClient.getData('/todos').subscribe((data) => console.log(data)); just an example of call
  }

  showInput: boolean = false;

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
    this.showInput = false;
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }
}
