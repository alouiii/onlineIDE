import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  standalone: true,
  imports: [MonacoEditorModule, FormsModule]
})
export class CodeEditorComponent {
  editorOptions = {
    theme: 'vs-light',
    language: 'javascript',
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
    this.editorOptions = {
      theme: 'vs-light',
      language: selectedLanguage,
    };
  }
}
