import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { CompanyProjectsComponent } from './company-projects/company-projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ROUTES } from './project-routes';
import { ProjectService } from './project.service';
import {MatDividerModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    MatDividerModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CreateProjectComponent, ProjectDetailsComponent, CompanyProjectsComponent],
  providers: [ProjectService],

})
export class ProjectModule { }
