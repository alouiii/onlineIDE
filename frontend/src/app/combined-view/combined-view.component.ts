import { Component } from '@angular/core';
import { FileExplorerComponent } from "../file-explorer/file-explorer.component";
import { CodeEditorComponent } from "../code-editor/code-editor.component";
import { TerminalComponent } from "../terminal/terminal.component";

@Component({
    selector: 'app-combined-view',
    standalone: true,
    templateUrl: './combined-view.component.html',
    styleUrl: './combined-view.component.css',
    imports: [FileExplorerComponent, CodeEditorComponent, TerminalComponent]
})
export class CombinedViewComponent {

}
