import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {FooterComponent, HeaderComponent} from "./layout";
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatMenuModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent
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
        HttpClientModule,
        RouterModule,
        HeaderComponent,
        FooterComponent
    ]
})
export class SharedModule {}
