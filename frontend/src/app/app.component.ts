import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TerminalComponent } from "./terminal/terminal.component";
import { CodeEditorComponent } from "./code-editor/code-editor.component";
import { FileExplorerComponent } from "./file-explorer/file-explorer.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, TerminalComponent, CodeEditorComponent, FileExplorerComponent]
})
export class AppComponent {
  title = 'onlineID_FrontEnd';
}
