import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ROUTES } from './project-routes';
import { ProjectService } from './project.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CreateProjectComponent],
  providers: [ProjectService],

})
export class ProjectModule { }
