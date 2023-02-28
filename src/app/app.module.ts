import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule} from '@angular/forms';

import { DxTreeViewModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HierarchyDataComponent } from './component/hierarchy-data/hierarchy-data.component';
import { TableComponent } from './component/table/table.component';
import { TabsComponent } from './component/tabs/tabs.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NgbdSortableHeader } from './directive/sortable.directive';
import {DataService} from './services/data.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KeysPipe } from './keys.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './component/form/form.component';
import { EmployeeFormComponent } from './forms-folder/employee-form/employee-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';











@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HierarchyDataComponent,
    TableComponent,
    TabsComponent,
    BreadcrumbsComponent,
    NgbdSortableHeader,
    KeysPipe,
    HomeComponent,
    FormComponent,
    EmployeeFormComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DxTreeViewModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
