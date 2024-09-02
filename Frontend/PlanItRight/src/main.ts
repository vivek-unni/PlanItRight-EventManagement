import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule, // Import HttpClientModule for HTTP services
    { provide: JWT_OPTIONS, useValue: {} }, // Provide an empty object as JWT_OPTIONS
    JwtHelperService, // Provide JwtHelperService correctly
    ...appConfig.providers || [], // Spread appConfig providers, if any
    // Other global providers
  ],
}).catch(err => console.error(err));
