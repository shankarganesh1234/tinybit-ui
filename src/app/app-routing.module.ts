import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TinybitHomeComponent} from "./tinybit-home/tinybit-home.component";

const routes: Routes = [
    {path: '', component: TinybitHomeComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
