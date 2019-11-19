import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material-module";
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatTabsModule,
  MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainMenu } from "./menu/main.menu";

import { Activation } from "./activation/activation.component";
import { DomainComponent } from "./domain/domain.component";
import { DomainDetailComponent } from './domain/domain-detail.component';
import { DomainGroupComponent } from './domain/domain-group.component';
import { Informations } from "./information/informations.component";
import { LabsSearch } from "./labs/labs-search.component";
import { UnitComponent } from "./unit/unit.component";
import { UnitDetailComponent } from "./unit/unit-detail.component";
import { UnitDomainComponent } from "./unit/unit-domain.component";
import { UserComponent } from "./users/user.component";

import { DataService } from "./_services/data-service.service";
import { JwtInterceptor } from './_interceptor/jwt.interceptor'
import { LoginComponent } from './shared/components/login.component';
import { AlertComponent } from './shared/components/alert.component';
import { DomainSearchComponent } from './domain/domain-search.component';


@NgModule({
  declarations: [
    AppComponent,
    MainMenu,
    DomainComponent,
    UnitComponent,
    LabsSearch,
    UserComponent,
    Activation,
    Informations,
    UnitDetailComponent,
    UnitDomainComponent,
    DomainDetailComponent,
    LoginComponent,
    AlertComponent,
    DomainGroupComponent,
    DomainSearchComponent,
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
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
