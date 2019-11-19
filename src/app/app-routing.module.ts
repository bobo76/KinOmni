import { Activation } from "./activation/activation.component";
import { DomainComponent } from "./domain/domain.component";
import { Informations } from "./information/informations.component";
import { LabsSearch } from "./labs/labs-search.component";
import { UnitComponent } from "./unit/unit.component";
import { UserComponent } from "./users/user.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './shared/components/login.component';

const routes: Routes = [
  { path: "", component: Informations },
  { path: "activation", component: Activation },
  { path: "domain", component: DomainComponent },
  { path: "unit", component: UnitComponent },
  { path: "user", component: UserComponent },
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
