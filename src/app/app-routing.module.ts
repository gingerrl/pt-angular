import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { MainViewComponent } from "./views/main-view/main-view.component";

const routes: Routes = [
    {
        path: 'home',
        component: MainViewComponent,
    },
    {
        path: '**',
        redirectTo: 'home'
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
