import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserSectionComponent } from './components/user-section/user-section.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ChatComponent,
    },
];

@NgModule({
    declarations: [ChatComponent, SideBarComponent, UserSectionComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(ROUTES),
    ],
})
export class ChatModule {}
