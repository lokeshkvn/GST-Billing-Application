import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GstService } from './gst.service.ts.service'
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GstService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
