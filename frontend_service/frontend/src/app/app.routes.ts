import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsSectionComponent, canActivate: [AuthGuard] },
  { path: 'editor/:projectId', component: SidenavComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
