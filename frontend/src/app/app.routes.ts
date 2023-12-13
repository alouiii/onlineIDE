import { RouterModule, Routes } from '@angular/router';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { TerminalComponent } from './terminal/terminal.component';
import { CombinedViewComponent } from './combined-view/combined-view.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: 'combined-view', component: CombinedViewComponent },
  { path: 'file-explorer', component: FileExplorerComponent },
  { path: 'code-editor', component: CodeEditorComponent },
  { path: 'terminal', component: TerminalComponent },
  { path: '', redirectTo: '/combined-view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }