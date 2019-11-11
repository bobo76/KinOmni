import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UnitDto, UnitSearchDto } from "../model/model";
import { Observable } from "rxjs";
import { debounceTime, filter, flatMap, tap, switchMap, finalize } from "rxjs/operators";
import { DataService } from '../_services/data-service.service';
import { AlertService } from '../_services/alert.service.service';

@Component({
  selector: "app-unit-search",
  templateUrl: "./unit-search.component.html",
  styleUrls: ["./unit-search.component.scss"]
})
export class UnitSearch implements OnInit {
  // displayedColumns: string[] = ["unitId", "machineName", "description"];
  dataSource: UnitSearchDto[] = [];
  selectedUnit$: Observable<UnitDto>;
  selectedUnit: UnitDto;
  usersForm: FormGroup;
  showUnitDomain: boolean = false;
  isLoading: boolean;

  constructor(private data: DataService,
    private fb: FormBuilder, 
    private alertService: AlertService) { }

  ngOnInit():void {
    this.usersForm = this.fb.group({
      userInput: null
    });
    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        filter(test => {
          return test && test.length > 1;
        }),
        tap(() => this.isLoading = true),
        switchMap(value => this.data.searchUnit(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(result => this.dataSource = result,
        error => {
          this.alertService.httpError(error);
        });
  }

  displayFn(unit: UnitSearchDto) {
    if (unit) { return unit.description; }
  }

  valueChanged(event: MatAutocompleteSelectedEvent): void {
    const unitSelected: UnitSearchDto = event.option.value;
    if (unitSelected) {
      this.selectedUnit$ = this.data.getUnit(unitSelected.unitId);
      this.selectedUnit$.subscribe(selected => this.selectedUnit = selected);
    }
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


  onManageDomainClick(): void {
    this.showUnitDomain = !this.showUnitDomain;
  }
}
