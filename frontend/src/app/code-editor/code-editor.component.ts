import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent {
   editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true // This will auto adjust the size of the editor
  };
  code: string = 'console.log("Hello, Monaco Editor!");';
  
   changeLanguage(language: string): void {
    this.editorOptions = { ...this.editorOptions, language: language };
  }

}
