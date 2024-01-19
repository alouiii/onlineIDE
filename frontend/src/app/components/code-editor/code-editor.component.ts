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
import { ThemeService } from 'src/app/services/theme.service';

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
  private isDarkModeSubscription: Subscription;

  private isDarkMode: boolean = false;

  editorOptions: { theme: string; language: string } = {
    theme: 'vs-light',
    language: 'javascript',
  };
  code: string = this.fileService.currentFile?.code ?? '';

  constructor(
    private httpClient: HttpClient,
    private compileService: CompileService,
    private fileService: FileService,
    private themeService: ThemeService
  ) {
    // Subscribe to changes in currentFile
    this.fileSubscription = this.fileService.currentFile$.subscribe((file) => {
      this.code = file?.code ?? '';
    });
    // Subscribe to changes in isDarkMode
    this.isDarkModeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDarkMode) => {
        // React to changes in isDarkMode
        this.isDarkMode = isDarkMode;
        this.editorOptions = {
          theme: this.isDarkMode ? 'vs-dark' : 'vs-light',
          language: 'javascript',
        };
      }
    );
  }

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
    this.isDarkModeSubscription.unsubscribe();
  }
}
