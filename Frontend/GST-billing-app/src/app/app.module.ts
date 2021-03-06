import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GstService } from './gst.service.ts.service'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'
import { TabViewModule } from 'primeng/tabview';
import { DataScrollerModule } from 'primeng/datascroller';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
    DataViewModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    BrowserAnimationsModule,
    TabViewModule,
    DataScrollerModule,
    CheckboxModule,
    ReactiveFormsModule
  ],
  providers: [GstService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
