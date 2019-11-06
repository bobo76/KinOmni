import { Component, OnInit } from "@angular/core";
import { InformationsDto } from "../model/model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-informations",
  templateUrl: "./informations.component.html",
  styleUrls: ["./informations.component.css"]
})
export class Informations {
  private informations: InformationsDto;
  constructor() {
    this.informations = new InformationsDto();
    this.informations.environement = "test";
   }

  theDate(): string {
    return new Date().toDateString();
  }
}
