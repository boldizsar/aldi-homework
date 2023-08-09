import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MessageChannelComponent } from './components/message-channel/message-channel.component';
import { MessageChannelSelectorComponent } from './components/message-channel-selector/message-channel-selector.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, MessageChannelComponent, MessageChannelSelectorComponent, NavigationBarComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
