import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UnitDto, UnitSearchDto } from "../model/model";
import { Observable } from "rxjs";
import { debounceTime, filter, flatMap } from "rxjs/operators";
import { DataService } from '../_services/data-service.service';

@Component({
  selector: "app-unit-search",
  templateUrl: "./unit-search.component.html",
  styleUrls: ["./unit-search.component.scss"]
})
export class UnitSearch implements OnInit {
  // displayedColumns: string[] = ["unitId", "machineName", "description"];
  dataSource: UnitSearchDto[] = [];
  unitList$: Observable<UnitSearchDto[]>;
  selectedUnit$: Observable<UnitDto>;
  selectedUnit: UnitDto;
  myControl = new FormControl();
  filteredOptions$: Observable<UnitSearchDto[]>;
  showUnitDomain: boolean = false;
  lastValue: string;

  constructor(private data: DataService) { }

  ngOnInit():void {
    this.filteredOptions$ = this.myControl.valueChanges
    .pipe(
        debounceTime(400),
        filter(test => {
          const rst = test && test.toLowerCase().length > 1;
          //const same = this.lastValue && test != this.lastValue;
          //console.log(`Filter rst ${rst} - same ${same} - this.lastValue ${this.lastValue} - test ${test}`);
          //this.lastValue = test;
          return rst;
        }),
        // distinctUntilChanged((prev, cur) => {
        //   console.log(`prev:${prev} - cur: ${cur} - last: ${this.lastValue}`);
        //   const rst = this.lastValue && cur !== this.lastValue;
        //   this.lastValue = cur;
        //   return rst;
        // }),
        // map(value => {
        //   console.log(`map value ${value}`);
        //   return value;
        // }),
        flatMap(value => this.data.searchUnit(value)),
      );
      this.filteredOptions$.subscribe(result => this.dataSource = result);
  }

  onSaveClick(unit: UnitDto): void {
    this.data.saveUnit(unit)
    .subscribe(result => {
        console.log("Save result : " + result);
      });
  }

  onUndoClick(): void {
    this.selectedUnit$ = this.data.getUnit(this.selectedUnit.unitId);
    this.selectedUnit$.subscribe(selected => this.selectedUnit = selected);
  }

  valueChanged(event: MatAutocompleteSelectedEvent): void {
    // const unitId: number = +event.option.value;
    const machineName: string = event.option.value;
    const unit: UnitSearchDto = this.dataSource.find(t => t.machineName === machineName);
    if(unit) {
      this.selectedUnit$ = this.data.getUnit(unit.unitId);
      this.selectedUnit$.subscribe(selected => this.selectedUnit = selected);
      }
  }

  onManageDomainClick(): void {
    this.showUnitDomain = !this.showUnitDomain;
  }
}
