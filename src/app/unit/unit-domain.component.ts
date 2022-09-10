import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { UnitDomain } from "../model/model";
import { Observable } from "rxjs";
import { DataService } from "../_services/data.service";

@Component({
  selector: "app-unit-domain",
  templateUrl: "./unit-domain.component.html",
  styleUrls: ["./unit-domain.component.scss"]
})

export class UnitDomainComponent implements OnChanges {
  public unitDomain$: Observable<UnitDomain[]>;

  @Input()
  unitId: string;

  constructor(private data: DataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.unitDomain$ = this.data.getUnitDomainList(this.unitId);
  }
  // tslint:disable-next-line:no-empty
  saveUnit(): void {
  }
  // tslint:disable-next-line:no-empty
  undoChanges(): void {
  }
}
