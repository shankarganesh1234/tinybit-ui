import {BrowserModule} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {CryptoService} from "./services/crypto.service";
import {TinybitHomeComponent} from "./tinybit-home/tinybit-home.component";
import {TinybitFooterComponent} from "./tinybit-footer/tinybit-footer.component";

@NgModule({
  declarations: [
      AppComponent,
      TinybitHomeComponent,
      TinybitFooterComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // add this!
})
export class AppModule { }
