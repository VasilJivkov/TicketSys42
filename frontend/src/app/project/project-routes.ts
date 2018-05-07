import { Routes } from '@angular/router';
import { CompanyProjectsComponent } from './company-projects/company-projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

export const ROUTES: Routes = [
  { path: 'createProject', component: CreateProjectComponent },
  { path: 'all', component: CompanyProjectsComponent },
  { path: ':projectTitle', component: ProjectDetailsComponent },
];
