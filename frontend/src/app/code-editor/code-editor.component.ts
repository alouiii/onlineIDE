import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CompileService } from '../compile.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  standalone: true,
  imports: [
    MonacoEditorModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class CodeEditorComponent {
  editorOptions = {
    theme: 'vs-light',
    language: 'javascript',
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor(
    private httpClient: HttpClient,
    private compileService: CompileService
  ) {}

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
    this.editorOptions = {
      theme: 'vs-light',
      language: selectedLanguage,
    };
  }

  save() {
    localStorage.setItem('savedCode', this.code);
  }

  compile() {
    console.log('Compiling code:', this.code); // Added for debugging
    this.compileService.compileCode(this.code).subscribe({
      next: (response) => {
        console.log('Compilation successful:', response);
      },
      error: (error) => {
        console.error('Compilation error:', error);
      },
    });
  }

  run() {
    const apiUrl = '/api/run'; // run API endpoint
    const payload = {
      language: this.editorOptions.language,
      code: this.code,
    };

    console.log(`Sending code to ${apiUrl} for execution...`, payload);
    this.httpClient.post(apiUrl, payload).subscribe({
      next: (response) => {
        console.log('Execution successful:', response);
      },
      error: (error) => {
        console.error('Execution error:', error);
      },
    });
  }
}
