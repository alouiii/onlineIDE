import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MonacoEditorModule.forRoot(),
    BrowserAnimationsModule,
    NavbarComponent,
    SidenavComponent,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    ProjectsSectionComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
