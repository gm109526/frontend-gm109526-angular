import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Bootstrap l'application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Fournit les routes
    provideAnimationsAsync(), // Fournit les animations
    provideHttpClient(withFetch())
  ]
})
.catch(err => console.error(err));
