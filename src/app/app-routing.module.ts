import { Activation } from "./activation/activation.component";
import { DomainSearch } from "./domain/domain-search.component";
import { Informations } from "./information/informations.component";
import { LabsSearch } from "./labs/labs-search.component";
import { UnitSearch } from "./unit/unit-search.component";
import { UserSearch } from "./users/user-search.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './shared/components/login.component';

const routes: Routes = [
  { path: "", component: Informations },
  { path: "activation", component: Activation },
  { path: "domain", component: DomainSearch },
  { path: "unit", component: UnitSearch },
  { path: "user", component: UserSearch },
  { path: "login", component: LoginComponent },
  { path: "labs", component: LabsSearch }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false // for debuging, set to true
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
