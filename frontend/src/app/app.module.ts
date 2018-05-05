import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AppConfig } from './config/app.config';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GuardsModule } from './route-guards/guards.module';
import { CreateTicketModule } from './create-ticket/create-ticket.module';
import { MaterialSharedModule } from './shared/material-shared.module';
import { HeaderComponent, FooterComponent } from './layout';
import { SharedModule } from './shared/shared.module';
import { AdministrationModule } from './administration/administration.module';
import { CompanyModule } from './company/company.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeNamePipe } from './layout/welcome-name.pipe';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeNamePipe,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    GuardsModule,
    MaterialSharedModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdministrationModule,
    CompanyModule,
    CreateTicketModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: []
      }
    }),
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
