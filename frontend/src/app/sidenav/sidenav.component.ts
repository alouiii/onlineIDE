import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ApiClientService } from '../api-client.service';
import { TerminalComponent } from '../terminal/terminal.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: true,
  imports: [CommonModule, MatSidenavModule, CodeEditorComponent, TerminalComponent],
})
export class SidenavComponent {
  opened: boolean = false;

  constructor(private apiClient: ApiClientService) {
    this.apiClient.getData('/todos').subscribe((data) => console.log(data));
  }
}
