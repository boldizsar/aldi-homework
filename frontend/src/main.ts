import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// SockJS fix
(window as any).global = window;

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
