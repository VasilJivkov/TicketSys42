import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {FooterComponent, HeaderComponent} from "./layout";
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule, MatSelectModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatMenuModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule,
        FlexLayoutModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
        HeaderComponent,
        FooterComponent,
        FlexLayoutModule
    ]
})
export class SharedModule {}
