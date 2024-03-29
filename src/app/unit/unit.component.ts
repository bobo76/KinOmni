import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { UnitDto, UnitSearchDto } from "../model/model";
import { Observable } from "rxjs";
import { debounceTime, filter, tap, switchMap, finalize, flatMap } from "rxjs/operators";
import { DataService } from "../_services/data.service";
import { AlertService } from "../_services/alert.service";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.scss"]
})
export class UnitComponent implements OnInit {
  dataSource: UnitSearchDto[] = [];
  selectedUnit$: Observable<UnitDto>;
  selectedUnit: UnitDto;
  unitsForm: FormGroup;
  isLoading: boolean;

  constructor(private data: DataService,
    private fb: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit():void {
    this.unitsForm = this.fb.group({
      unitInput: null
    });

    this.unitsForm
      .get("unitInput")
      .valueChanges
      .pipe(
        debounceTime(400),
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

  displayFn(unit: UnitSearchDto): string {
    if (unit) {
      return unit.description;
    }
  }

  valueChanged(event: MatAutocompleteSelectedEvent): void {
    const unitSelected: UnitSearchDto = event.option.value;
    if (unitSelected) {
      this.selectedUnit$ = this.data.getUnit(unitSelected.unitId);
      this.selectedUnit$.subscribe(selected => this.selectedUnit = selected,
        error => {
          this.alertService.httpError(error);
        });
    }
  }

  onSaveClick(unit: UnitDto): void {
    this.data.saveUnit(unit)
    .subscribe(result => {
        console.log("Save result : " + result);
      },
      error => {
        this.alertService.httpError(error);
      });
  }

  onUndoClick(): void {
    this.selectedUnit$ = this.data.getUnit(this.selectedUnit.unitId);
    this.selectedUnit$.subscribe(selected => this.selectedUnit = selected,
      error => {
        this.alertService.httpError(error);
      });
  }
}
