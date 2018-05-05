import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AdministrationModule } from './administration/administration.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule } from './company/company.module';
import { AppConfig } from './config/app.config';
import { CoreModule } from './core/core.module';
import { CreateTicketModule } from './create-ticket/create-ticket.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent, HeaderComponent } from './layout';
import { WelcomeNamePipe } from './layout/welcome-name.pipe';
import { GuardsModule } from './route-guards/guards.module';
import { MaterialSharedModule } from './shared/material-shared.module';
import { SharedModule } from './shared/shared.module';

export const tokenGetter = () => {
    return localStorage.getItem('access_token');
};

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
        blacklistedRoutes: [],
      },
    }),
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent],
})
export class AppModule { }
