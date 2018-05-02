import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { AppConfig } from './config/app.config';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { GuardsModule } from './route-guards/guards.module';
import { ProfilePageModule } from './profile-page/profile-page.module';
import {CompanyDetailsComponent} from "./company/company.details.component";

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompanyDetailsComponent,
  ],
  imports: [
    CoreModule,
    GuardsModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ProfilePageModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
        config: {
            tokenGetter,
            whitelistedDomains: ['localhost:8000'],
            blacklistedRoutes: []
        }
    })
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
