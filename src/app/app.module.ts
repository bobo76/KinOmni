import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
// import { MatDialog } from '@angular/material'
// import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
// import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainMenu } from "./menu/main.menu";

import { Activation } from "./activation/activation.component";
import { DomainSearch } from "./domain/domain-search.component";
import { Informations } from "./information/informations.component";
import { LabsSearch } from "./labs/labs-search.component";
import { UnitSearch } from "./unit/unit-search.component";
import { UserSearch } from "./users/user-search.component";

import { MaterialModule } from "../material-module";
import { DataService } from "./shared/data-service.service";
import { JwtInterceptor } from './shared/jwt.interceptor'
import { UnitDetailComponent } from "./unit/unit-detail.component";
import { UnitDomainComponent } from "./unit/unit-domain.component";
import { DomainDetailComponent } from './domain/domain-detail.component';
import { LoginComponent } from './shared/components/login.component';


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
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
