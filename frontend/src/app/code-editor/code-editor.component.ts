import { Component } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
})
export class CodeEditorComponent {
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
    this.editorOptions = {
      theme: 'vs-dark',
      language: selectedLanguage,
    };
  }
}
