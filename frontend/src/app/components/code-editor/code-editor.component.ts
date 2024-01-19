import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CompileService } from '../../services/compile.service';
import { FileService } from 'src/app/services/file.service';
import { Subscription } from 'rxjs';

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
export class CodeEditorComponent implements OnDestroy {
  private fileSubscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private compileService: CompileService,
    private fileService: FileService
  ) {
    // Subscribe to changes in currentFile
    this.fileSubscription = this.fileService.currentFile$.subscribe((file) => {
      this.code = file?.code ?? '';
    });
  }

  editorOptions = {
    theme: 'vs-light',
    language: 'javascript',
  };
  code: string = this.fileService.currentFile?.code ?? '';

  save() {
    localStorage.setItem('savedCode', this.code);
  }

  compile() {
    this.compileService.compileCode(this.code).subscribe({
      next: (response) => {
        console.log('Compilation successful:', response);
      },
      error: (error) => {
        console.error('Compilation error:', error);
      },
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.fileSubscription.unsubscribe();
  }
}
