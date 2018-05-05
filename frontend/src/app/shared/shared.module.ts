import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApproachingDeadlineDirective } from './approaching-deadline.directive';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [ApproachingDeadlineDirective ],
  imports: [...modules],
  exports: [...modules, ApproachingDeadlineDirective],
})
export class SharedModule {}
