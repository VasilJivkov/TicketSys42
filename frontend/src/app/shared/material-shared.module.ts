import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatTableModule, MatCheckboxModule, MatGridListModule, MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule} from "@angular/material";

const modules = [
  MatCardModule,
  MatMenuModule,
  MatSelectModule,
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
