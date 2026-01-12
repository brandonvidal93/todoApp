import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { RemoteConfigService } from './app/core/remote-config.service';
import { Drivers } from "@ionic/storage";
import { IonicStorageModule } from '@ionic/storage-angular';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__todoapp',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
    ),

    provideRemoteConfig(() => {
      const rc = getRemoteConfig();
      rc.settings.minimumFetchIntervalMillis = 0; 
      return rc;
    }),

    {
      provide: APP_INITIALIZER,
      useFactory: (rcService: RemoteConfigService) => () => rcService.load(),
      deps: [RemoteConfigService],
      multi: true,
    },
  ],
});