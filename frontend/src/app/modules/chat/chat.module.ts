import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: '',
        component: ChatComponent,
    },
];

@NgModule({
    declarations: [ChatComponent],
    imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class ChatModule {}
