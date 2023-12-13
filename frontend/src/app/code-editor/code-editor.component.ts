import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule} from 'ngx-monaco-editor-v2';



@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
   editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true
  };
  code: string = 'console.log("Hello, Monaco Editor!");';

changeLanguage(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedLanguage = selectElement.value;
  this.editorOptions = {
 theme: 'vs-dark',
  language: selectedLanguage,
  automaticLayout: true  };
}



}
