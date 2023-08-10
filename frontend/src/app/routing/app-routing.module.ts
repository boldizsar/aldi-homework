import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const ROUTE_NAMES = {
    login: 'login',
    chat: 'chat',
};

const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chat',
    },
    {
        path: ROUTE_NAMES.login,
        loadChildren: () =>
            import('./../modules/login/login.module').then(
                (mod) => mod.LoginModule
            ),
        data: { preload: true },
    },
    {
        path: ROUTE_NAMES.chat,
        canActivate: [authGuard],
        loadChildren: () =>
            import('./../modules/chat/chat.module').then(
                (mod) => mod.ChatModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
