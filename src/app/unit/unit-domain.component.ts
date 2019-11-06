import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { UnitDomain } from "../model/model";
import { Observable } from "rxjs";
import { DataService } from "../shared/data-service.service";

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

}
