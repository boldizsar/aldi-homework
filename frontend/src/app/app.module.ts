import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';

@NgModule({
    declarations: [AppComponent, PageLoaderComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
