import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material-module";
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatTabsModule,
  MatCheckboxModule
} from '@angular/material';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainMenu } from "./menu/main.menu";

import { Activation } from "./activation/activation.component";
import { DomainSearch } from "./domain/domain-search.component";
import { DomainDetailComponent } from './domain/domain-detail.component';
import { DomainGroupComponent } from './domain/domain-group.component';
import { Informations } from "./information/informations.component";
import { LabsSearch } from "./labs/labs-search.component";
import { UnitSearch } from "./unit/unit-search.component";
import { UnitDetailComponent } from "./unit/unit-detail.component";
import { UnitDomainComponent } from "./unit/unit-domain.component";
import { UserSearch } from "./users/user-search.component";

import { DataService } from "./_services/data-service.service";
import { JwtInterceptor } from './_interceptor/jwt.interceptor'
import { LoginComponent } from './shared/components/login.component';
import { AlertComponent } from './shared/components/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    MainMenu,
    DomainSearch,
    UnitSearch,
    LabsSearch,
    UserSearch,
    Activation,
    Informations,
    UnitDetailComponent,
    UnitDomainComponent,
    DomainDetailComponent,
    LoginComponent,
    AlertComponent,
    DomainGroupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    // MatDialog,
    MatCheckboxModule,
    ReactiveFormsModule,    
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
