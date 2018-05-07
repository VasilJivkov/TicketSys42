import {
  NgModule,
} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

const modules = [
  MatCardModule,
  MatMenuModule,
  MatSelectModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTabsModule,
  MatTableModule,
  MatGridListModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatSortModule,
  MatIconModule,
  MatPaginatorModule,
  MatToolbarModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialSharedModule {}
