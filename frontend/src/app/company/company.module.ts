import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company.details.component';
import { ROUTES } from './company-routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CompanyDetailsComponent],
})
export class CompanyModule { }
