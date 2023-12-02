import { NgModule } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // your components here
  ],
  imports: [
    // other modules here
    MonacoEditorModule.forRoot() // use forRoot() in the main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
