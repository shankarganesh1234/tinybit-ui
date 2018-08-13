import {BrowserModule} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {TinybitHomeComponent} from "./tinybit-home/tinybit-home.component";
import {TinybitFooterComponent} from "./tinybit-footer/tinybit-footer.component";
import {CoreService} from "./services/core.service";
import {TinybitCreateComponent} from "./tinybit-create/tinybit-create.component";
import {TinybitGetComponent} from "./tinybit-get/tinybit-get.component";

@NgModule({
  declarations: [
      AppComponent,
      TinybitHomeComponent,
      TinybitFooterComponent,
      TinybitCreateComponent,
      TinybitGetComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [CoreService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // add this!
})
export class AppModule { }
