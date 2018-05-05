import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApproachingDeadlineDirective } from './approaching-deadline.directive';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [ApproachingDeadlineDirective ],
  imports: [...modules],
  exports: [...modules, ApproachingDeadlineDirective],
})
export class SharedModule {}
