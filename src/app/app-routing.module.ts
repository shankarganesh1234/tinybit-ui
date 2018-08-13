import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TinybitHomeComponent} from "./tinybit-home/tinybit-home.component";
import {TinybitCreateComponent} from "./tinybit-create/tinybit-create.component";
import {TinybitGetComponent} from "./tinybit-get/tinybit-get.component";

const routes: Routes = [
    {path: '', component: TinybitHomeComponent},
    {path: 'create', component: TinybitCreateComponent},
    {path: ':key', component: TinybitGetComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
